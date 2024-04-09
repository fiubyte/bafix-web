import {useFormik} from 'formik';
import './RegisterForm.css';
import {Button, Grid, Slider, TextField, Typography} from '@mui/material';
import axios from 'axios';
import config from '../../config';
import * as Yup from 'yup';
import React from "react";

interface RegisterValues {
  email: string;
  password: string;
  password2: string;
  name: string;
  surname: string;
  document_number: string;
  street: string;
  street_number: string;
  postal_code: string;
  phone_number: string;
  max_radius: number;
  profile_photo_url: string;
}

const RegisterForm = (): JSX.Element => {
  const validationSchema = Yup.object({
    email: Yup.string().email('Email inválido').required('Campo requerido'),
    password: Yup.string().required('Campo requerido'),
    password2: Yup.string()
      .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
      .required('Campo requerido'),
    name: Yup.string().required('Campo requerido'),
    surname: Yup.string().required('Campo requerido'),
    document_number: Yup.string().required('Campo requerido'),
    street: Yup.string().required('Campo requerido'),
    street_number: Yup.string().required('Campo requerido'),
    postal_code: Yup.string().required('Campo requerido'),
    phone_number: Yup.string().required('Campo requerido'),
    max_radius: Yup.number()
      .max(30, 'El radio máximo debe ser menor o igual a 30')
      .min(1, 'El radio máximo debe ser mayor o igual a 1')
      .required('Campo requerido'),
    profile_photo_url: Yup.string().required('Campo requerido'),
  });

  const formik = useFormik<RegisterValues>({
    initialValues: {
      email: '',
      password: '',
      password2: '',
      name: '',
      surname: '',
      document_number: '',
      street: '',
      street_number: '',
      postal_code: '',
      phone_number: '',
      max_radius: 0,
      profile_photo_url: '',
    },
    onSubmit: async (values) => {
      try {
        console.log('Register form submitted:', values);
        const response = await axios.post<RegisterValues>(
          `${config.apiUrl}/users/`,
          values
        );
        console.log('User created successfully', response.data);
      } catch (error) {
        console.error('Error creating user', error);
      }
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const renderTextField = (
    label: string,
    name: keyof RegisterValues,
    type: string = 'text'
  ): React.ReactNode => (
    <Grid item xs={4}>
      <Typography variant="body1" component="label">
        {label} <span className={"RegisterForm-required"}> *</span>
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={
          formik.touched[name] && formik.errors[name] ? formik.errors[name] : ' '
        }
        size="small"
      />
    </Grid>
  );

  return (
    <form onSubmit={formik.handleSubmit} className="RegisterForm" noValidate autoComplete="off">
      <Typography variant="h3">Datos personales</Typography>
      <Grid container className="RegisterForm-grid" columnSpacing={4}>
        {renderTextField('Nombre', 'name')}
        {renderTextField('Apellido', 'surname')}
        {renderTextField('DNI', 'document_number')}
        {renderTextField('Calle', 'street')}
        {renderTextField('Número', 'street_number')}
        {renderTextField('Código postal', 'postal_code')}
        {renderTextField('Teléfono', 'phone_number')}
      </Grid>
      <Typography variant="h3">Cuenta de inicio de sesión</Typography>
      <Grid container className="RegisterForm-grid" columnSpacing={4}>
        {renderTextField('Email', 'email', 'email')}
        <Grid item xs={8}></Grid>
        {renderTextField('Contraseña', 'password', 'password')}
        {renderTextField('Repetir contraseña', 'password2', 'password')}
      </Grid>
      <Typography variant="h3">Configuración de perfil</Typography>
      <Grid container className="RegisterForm-grid" columnSpacing={4}>
        {renderTextField('Link de la foto de perfil', 'profile_photo_url')}
        <Grid item xs={4}>
          <Typography variant="body1" component="label">
            Distancia máxima (kms) <span className={"RegisterForm-required"}> *</span>
          </Typography>
          <Slider
            value={formik.values.max_radius}
            onChange={(event, value) => formik.setFieldValue('max_radius', value)}
            valueLabelDisplay="auto"
            step={1}
            marks={[
              {value: 1, label: '1 km'},
              {value: 10, label: '10 km'},
              {value: 20, label: '20 km'},
              {value: 30, label: '30 km'},
            ]}
            min={1}
            max={30}
            size={"small"}
            valueLabelFormat={(value) => `${value} km`}
            className={"RegisterForm-slider"}
          />
        </Grid>
      </Grid>
      <Button variant="contained" type="submit" className={"RegisterForm-button"}>
        Finalizar registro
      </Button>
    </form>
  );
};

export default RegisterForm;

import {useFormik} from 'formik';
import './RegisterForm.css';
import {Button, Grid, Slider, TextField, Typography} from '@mui/material';
import axios from 'axios';
import config from '../../config';
import * as Yup from 'yup';
import React from "react";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

type RegisterFormProps = {
  handleSubmitError: () => void;
}

interface RegisterValues {
  email: string;
  password: string;
  password2: string;
  name: string;
  surname: string;
  document_number: string;
  document_photo_url: string;
  street: string;
  street_number: string;
  postal_code: string;
  phone_number: string;
  max_radius: number;
  profile_photo_url: string;
}

const RegisterForm = ({handleSubmitError}: RegisterFormProps): JSX.Element => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().email('Email inválido').required('Campo requerido'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('Campo requerido'),
    password2: Yup.string()
      .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
      .required('Campo requerido'),
    name: Yup.string().required('Campo requerido'),
    surname: Yup.string().required('Campo requerido'),
    document_number: Yup.string().required('Campo requerido'),
    document_photo_url: Yup.string().required('Campo requerido'),
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
      email: 'carlosf@gmail.com',
      password: '123123',
      password2: '123123',
      name: 'carlos',
      surname: 'Montes',
      document_number: '1111111',
      document_photo_url: 'foto.png',
      street: 'guemes',
      street_number: '1233',
      postal_code: '1232',
      phone_number: '1111111111',
      max_radius: 5,
      profile_photo_url: 'foto.png',
    },
    onSubmit: async (values) => {
      try {

        // Intento de crear un nuevo usuario
        const response = await axios.post(`${config.apiUrl}/users/`, values);
        console.log('User created successfully:', response.data);
        toast.success('Registro exitoso! Bienvenido/a a la plataforma.', {autoClose: 5000});

        // Preparar datos de autenticación
        const loginData = {
          email: values.email,
          password: values.password,
          google_id_token: ""  // Asumiendo que no se utiliza autenticación de Google en este paso
        };

        // Intento de autenticar al usuario y obtener el token JWT
        const loginResponse = await axios.post(`${config.apiUrl}/auth/login/`, loginData);
        console.log('Login successful. Obtained JWT:', loginResponse.data.token);
        localStorage.setItem(config.LOCAL_STORAGE_JWT_KEY, loginResponse.data.token);

        // Retraso antes de redirigir
        setTimeout(() => navigate('/mis-servicios'), 2000);
      } catch (error) {
        console.error('Error creating user:', error);

        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 400 && error.response.data.detail === 'Email is taken') {
            toast.error('El email ya está en uso. Por favor, utiliza otro email.');
          } else if (error.response.status === 400 && error.response.data.detail === 'Document number is taken') {
            toast.error('El número de documento ya está en uso. Por favor, utiliza otro número de documento.');
          } else {
            toast.error('Error al crear el usuario. Por favor, verifica los datos ingresados.');
          }
        } else {
          toast.error('Error de conexión. Por favor, verifica tu conexión a internet.');
        }
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
      <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar closeOnClick pauseOnHover draggable/>
      <Typography variant="h3">Datos personales</Typography>
      <Grid container className="RegisterForm-grid" columnSpacing={4}>
        {renderTextField('Nombre', 'name')}
        {renderTextField('Apellido', 'surname')}
        {renderTextField('DNI', 'document_number')}
        {renderTextField('Calle', 'street')}
        {renderTextField('Número', 'street_number')}
        {renderTextField('Código postal', 'postal_code')}
        {renderTextField('Teléfono', 'phone_number')}
        {renderTextField('Link del DNI', 'document_photo_url')}
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

import "./LoginForm.css";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {Button, TextField, Typography} from "@mui/material";
import React from "react";
import axios from "axios";

type LoginFormProps = {
  handleSubmitError: () => void;
}

interface LoginValues {
  email: string;
  password: string;
}

const LoginForm = ({handleSubmitError}: LoginFormProps) => {

  const validationSchema = Yup.object({
    email: Yup.string().email('Email inválido').required('Campo requerido'),
    password: Yup.string().required('Campo requerido')
  });

  const formik = useFormik<LoginValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios.post(`${process.env.REACT_APP_API_URL}/auth/login/`, values).then(
        (response) => {
          console.log(response);
        }
      ).catch(
        (error) => {
          handleSubmitError();
          console.log(error);
        }
      )
    }
  });

  return (
    <form className={"LoginForm"} onSubmit={formik.handleSubmit}>
      <Typography variant="body1" component="label">Correo electrónico</Typography>
      <TextField
        variant={"outlined"}
        id="email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        size="small"
        className={"LoginForm-text-field"}
      />
      <Typography variant="body1" component="label" sx={{mt: "1rem"}}>Contraseña</Typography>
      <TextField
        variant={"outlined"}
        id="password"
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        size="small"
        className={"LoginForm-text-field"}
      />
      <Button variant="contained" type="submit" className={"LoginForm-button"}>Ingresar</Button>
    </form>
  )
}

export default LoginForm;

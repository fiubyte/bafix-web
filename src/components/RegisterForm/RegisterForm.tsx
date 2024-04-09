import {useFormik} from "formik";
import "./RegisterForm.css";
import {Button, TextField} from "@mui/material";
import axios from "axios";
import config from "../../config";
import * as Yup from 'yup';

const RegisterForm = () => {

  const validationSchema = Yup.object({
    email: Yup.string().email("Email inválido").required("Campo requerido"),
    password: Yup.string().required("Campo requerido"),
    password2: Yup.string().oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir').required("Campo requerido"),
    name: Yup.string().required("Campo requerido"),
    surname: Yup.string().required("Campo requerido"),
    document_number: Yup.string().required("Campo requerido"),
    address: Yup.string().required("Campo requerido"),
    phone_number: Yup.string().required("Campo requerido"),
    max_radius: Yup.number().max(30, "El radio máximo debe ser menor o igual a 30").min(1, "El radio máximo debe ser mayor o igual a 1").required("Campo requerido"),
    profile_photo_url: Yup.string().url("URL inválida").required("Campo requerido"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password2: "",
      name: "",
      surname: "",
      document_number: "",
      address: "",
      phone_number: "",
      max_radius: 0,
      profile_photo_url: "",
    },
    onSubmit: (values) => {
      console.log("Register form submitted:");
      console.log(values);
      axios.post(config.apiUrl + "/users/", values).then((response) => {
        console.log("User created successfully");
        console.log(response.data);
      }).catch((error) => {
        console.error("Error creating user");
        console.error(error);
      });
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={"RegisterForm"} noValidate autoComplete={"off"}>
      <TextField
        label={"Email"}
        variant="outlined"
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        className={"RegisterForm-input"}
      />
      <TextField
        label={"Contraseña"}
        variant="outlined"
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        className={"RegisterForm-input"}
      />
      <TextField
        label={"Repetir contraseña"}
        variant="outlined"
        type="password"
        name="password2"
        value={formik.values.password2}
        onChange={formik.handleChange}
        error={formik.touched.password2 && Boolean(formik.errors.password2)}
        helperText={formik.touched.password2 && formik.errors.password2}
        className={"RegisterForm-input"}
      />
      <TextField
        label={"Nombre"}
        variant="outlined"
        type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        className={"RegisterForm-input"}
      />
      <TextField
        label={"Apellido"}
        variant="outlined"
        type="text"
        name="surname"
        value={formik.values.surname}
        onChange={formik.handleChange}
        error={formik.touched.surname && Boolean(formik.errors.surname)}
        helperText={formik.touched.surname && formik.errors.surname}
        className={"RegisterForm-input"}
      />
      <TextField
        label={"DNI"}
        variant="outlined"
        type="text"
        name="document_number"
        value={formik.values.document_number}
        onChange={formik.handleChange}
        error={formik.touched.document_number && Boolean(formik.errors.document_number)}
        helperText={formik.touched.document_number && formik.errors.document_number}
        className={"RegisterForm-input"}
      />
      <TextField
        label={"Dirección"}
        variant="outlined"
        type="text"
        name="address"
        value={formik.values.address}
        onChange={formik.handleChange}
        error={formik.touched.address && Boolean(formik.errors.address)}
        helperText={formik.touched.address && formik.errors.address}
        className={"RegisterForm-input"}
      />
      <TextField
        label={"Teléfono"}
        variant="outlined"
        type="text"
        name="phone_number"
        value={formik.values.phone_number}
        onChange={formik.handleChange}
        error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
        helperText={formik.touched.phone_number && formik.errors.phone_number}
        className={"RegisterForm-input"}
      />
      <TextField
        label={"Radio máximo (metros)"}
        variant="outlined"
        type="number"
        name="max_radius"
        value={formik.values.max_radius}
        onChange={formik.handleChange}
        error={formik.touched.max_radius && Boolean(formik.errors.max_radius)}
        helperText={formik.touched.max_radius && formik.errors.max_radius}
        className={"RegisterForm-input"}
      />
      <TextField
        label={"URL de la foto de perfil"}
        variant="outlined"
        type="text"
        name="profile_photo_url"
        value={formik.values.profile_photo_url}
        onChange={formik.handleChange}
        error={formik.touched.profile_photo_url && Boolean(formik.errors.profile_photo_url)}
        helperText={formik.touched.profile_photo_url && formik.errors.profile_photo_url}
        className={"RegisterForm-input"}
      />
      <Button variant={"outlined"} type="submit">Registrarse</Button>
    </form>
  );
}

export default RegisterForm;

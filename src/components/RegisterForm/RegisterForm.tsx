import {useFormik} from "formik";
import "./RegisterForm.css";
import {Button, TextField} from "@mui/material";
import axios from "axios";
import config from "../../config";

const RegisterForm = () => {
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
        className={"RegisterForm-input"}
      />
      <TextField
        label={"Contraseña"}
        variant="outlined"
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        className={"RegisterForm-input"}
      />
      <TextField
        label={"Repetir contraseña"}
        variant="outlined"
        type="password"
        name="password2"
        value={formik.values.password2}
        onChange={formik.handleChange}
        className={"RegisterForm-input"}
      />
      <TextField
        label={"Nombre"}
        variant="outlined"
        type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        className={"RegisterForm-input"}
      />
      <TextField
        label={"Apellido"}
        variant="outlined"
        type="text"
        name="surname"
        value={formik.values.surname}
        onChange={formik.handleChange}
        className={"RegisterForm-input"}
      />
      <TextField
        label={"DNI"}
        variant="outlined"
        type="text"
        name="document_number"
        value={formik.values.document_number}
        onChange={formik.handleChange}
        className={"RegisterForm-input"}
      />
      <TextField
        label={"Dirección"}
        variant="outlined"
        type="text"
        name="address"
        value={formik.values.address}
        onChange={formik.handleChange}
        className={"RegisterForm-input"}
      />
      <TextField
        label={"Teléfono"}
        variant="outlined"
        type="text"
        name="phone_number"
        value={formik.values.phone_number}
        onChange={formik.handleChange}
        className={"RegisterForm-input"}
      />
      <TextField
        label={"Radio máximo (metros)"}
        variant="outlined"
        type="number"
        name="max_radius"
        value={formik.values.max_radius}
        onChange={formik.handleChange}
        className={"RegisterForm-input"}
      />
      <TextField
        label={"URL de la foto de perfil"}
        variant="outlined"
        type="text"
        name="profile_photo_url"
        value={formik.values.profile_photo_url}
        onChange={formik.handleChange}
        className={"RegisterForm-input"}
      />
      <Button variant={"outlined"} type="submit">Registrarse</Button>
    </form>
  );
}

export default RegisterForm;

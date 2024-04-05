import {useFormik} from "formik";
import "./RegisterForm.css";

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      document_number: "",
      address: "",
      phone_number: "",
      max_radius: 0,
      profile_photo_url: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={"RegisterForm"}>
      <label htmlFor="name">Nombre</label>
      <input
        type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <label htmlFor="surname">Apellido</label>
      <input
        type="text"
        name="surname"
        value={formik.values.surname}
        onChange={formik.handleChange}
      />
      <label htmlFor="document_number">Número de documento</label>
      <input
        type="text"
        name="document_number"
        value={formik.values.document_number}
        onChange={formik.handleChange}
      />
      <label htmlFor="address">Dirección</label>
      <input
        type="text"
        name="address"
        value={formik.values.address}
        onChange={formik.handleChange}
      />
      <label htmlFor="phone_number">Número de teléfono</label>
      <input
        type="text"
        name="phone_number"
        value={formik.values.phone_number}
        onChange={formik.handleChange}
      />
      <label htmlFor="max_radius">Radio máximo</label>
      <input
        type="number"
        name="max_radius"
        value={formik.values.max_radius}
        onChange={formik.handleChange}
      />
      <label htmlFor="profile_photo_url">URL de la foto de perfil</label>
      <input
        type="text"
        name="profile_photo_url"
        value={formik.values.profile_photo_url}
        onChange={formik.handleChange}
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default RegisterForm;
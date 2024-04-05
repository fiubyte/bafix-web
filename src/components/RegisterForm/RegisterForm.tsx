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
      <input
        type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <input
        type="text"
        name="surname"
        value={formik.values.surname}
        onChange={formik.handleChange}
      />
      <input
        type="text"
        name="document_number"
        value={formik.values.document_number}
        onChange={formik.handleChange}
      />
      <input
        type="text"
        name="address"
        value={formik.values.address}
        onChange={formik.handleChange}
      />
      <input
        type="text"
        name="phone_number"
        value={formik.values.phone_number}
        onChange={formik.handleChange}
      />
      <input
        type="number"
        name="max_radius"
        value={formik.values.max_radius}
        onChange={formik.handleChange}
      />
      <input
        type="text"
        name="profile_photo_url"
        value={formik.values.profile_photo_url}
        onChange={formik.handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default RegisterForm;
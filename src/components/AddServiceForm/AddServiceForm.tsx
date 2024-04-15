import * as Yup from 'yup';
import {useFormik} from "formik";
import React from "react";
import {Button, Grid, MenuItem, Select, TextField, Typography} from "@mui/material";
import './AddServiceForm.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import config from "../../config";

type ServiceCategory = {
  id: number;
  title: string;
  description: string;
}

type AddServiceFormProps = {
  handleSubmitError: () => void;
  categories: ServiceCategory[];
}

interface AddServiceValues {
  service_category_id: number;
  title: string;
  description: string;
  photo_url: string;
  availability_time_start: string;
  availability_time_end: string;
  availability_days: string[];
}

const AddServiceForm = ({handleSubmitError, categories}: AddServiceFormProps) => {

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    service_category_id: Yup.number().required('Campo requerido'),
    title: Yup.string().required('Campo requerido'),
    description: Yup.string().required('Campo requerido'),
  });

  const handleSubmit = (values: AddServiceValues) => {
    const updatedValues = {
      ...values,
      availability_days: values.availability_days.join(',')
    };

    console.log(updatedValues);
    axios.post(`${config.apiUrl}/services/`, updatedValues,
      {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}})
      .then(
        (response) => {
          console.log(response);
          navigate('/mis-servicios');
        }
      ).catch(
      (error) => {
        console.log(error);
        handleSubmitError();
      }
    )
  }

  const formik = useFormik<AddServiceValues>({
    initialValues: {
      service_category_id: 1,
      title: '',
      description: '',
      photo_url: '',
      availability_time_start: '10:00',
      availability_time_end: '17:00',
      availability_days: ['Lunes'],
    },
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const hours = Array.from({length: 17}, (_, index) => {
    const hour = index + 6;
    return `${String(hour).padStart(2, '0')}:00`;
  });

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  return (
    <form onSubmit={formik.handleSubmit} className={"AddServiceForm"} noValidate autoComplete={"off"}>
      <Typography variant="body1" component="label">
        Título del servicio <span className={"AddServiceForm-required"}> *</span>
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        type={"text"}
        name={"title"}
        value={formik.values["title"]}
        onChange={formik.handleChange}
        error={formik.touched["title"] && Boolean(formik.errors["title"])}
        helperText={
          formik.touched["title"] && formik.errors["title"] ? formik.errors["title"] : ' '
        }
        size="small"
        className={"AddServiceForm-text-field"}
      />
      <Typography variant="body1" component="label">
        Categoría del servicio <span className={"AddServiceForm-required"}> *</span>
      </Typography>
      <Select
        fullWidth
        variant="outlined"
        type={"text"}
        name={"service_category_id"}
        value={formik.values["service_category_id"]}
        onChange={formik.handleChange}
        size="small"
        className={"AddServiceForm-text-field"}
      >
        {categories.map((category) => (
          <MenuItem value={category.id}>{category.title}</MenuItem>
        ))}
      </Select>
      <Typography variant="body1" component="label" sx={{mt: '1.5rem'}}>
        Descripción del servicio <span className={"AddServiceForm-required"}> *</span>
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        type={"text"}
        name={"description"}
        value={formik.values["description"]}
        onChange={formik.handleChange}
        error={formik.touched["description"] && Boolean(formik.errors["description"])}
        helperText={
          formik.touched["description"] && formik.errors["description"] ? formik.errors["description"] : ' '
        }
        size="small"
        className={"AddServiceForm-text-field"}
        multiline
        rows={5}
      />
      <Grid container columnSpacing={4} className={"AddServiceForm-select-container"}>
        <Grid item xs={4}>
          <Typography variant="body1" component="label">
            Días de atención <span className={"AddServiceForm-required"}> *</span>
          </Typography>
          <Select
            fullWidth
            multiple
            value={formik.values["availability_days"]}
            onChange={(event) => {
              const selectedDays = event.target.value as string[];
              formik.setFieldValue("availability_days", selectedDays);
            }}
            renderValue={(selected) => (selected as string[]).join(", ")}
            variant="outlined"
            name="availability_days"
            size="small"
            className={"AddServiceForm-text-field"}
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" component="label">
            Inicio rango horario <span className={"AddServiceForm-required"}> *</span>
          </Typography>
          <Select
            fullWidth
            variant="outlined"
            type={"text"}
            name={"availability_time_start"}
            value={formik.values["availability_time_start"]}
            onChange={formik.handleChange}
            size="small"
            className={"AddServiceForm-text-field"}
          >
            {hours.map((hour) => (
              <MenuItem value={hour}>{hour}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" component="label">
            Fin rango horario <span className={"AddServiceForm-required"}> *</span>
          </Typography>
          <Select
            fullWidth
            variant="outlined"
            type={"text"}
            name={"availability_time_end"}
            value={formik.values["availability_time_end"]}
            onChange={formik.handleChange}
            size="small"
            className={"AddServiceForm-text-field"}
          >
            {hours.map((hour) => (
              <MenuItem value={hour}>{hour}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Button variant="contained" type="submit" className={"AddServiceForm-button"}>
        Finalizar registro
      </Button>
    </form>
  )
}

export default AddServiceForm;

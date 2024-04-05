import {Box, Typography} from "@mui/material";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./RegisterPage.css";

const RegisterPage = () => {
  return (
    <Box className={"RegisterPage"}>
      <Typography variant={"h3"} className={"RegisterPage-title"}>¡Unite a BAFix!</Typography>
      <RegisterForm/>
    </Box>
  );
}

export default RegisterPage;

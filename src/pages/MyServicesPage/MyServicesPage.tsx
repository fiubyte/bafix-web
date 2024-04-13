import {Box} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";

const MyServicesPage = () => {
  return (
    <Box className={"MyServiesPage"}>
      <Navbar isLoggedIn={false}/>
    </Box>
  )
}

export default MyServicesPage;

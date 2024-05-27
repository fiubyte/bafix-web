import {Box, Typography} from "@mui/material";
import "./StatsPage.css"
import Navbar from "../../components/Navbar/Navbar";

const StatsPage = () => {
  return (
    <Box className={"StatsPage"}>
      <Navbar isUserLoggedIn={true}/>
      <Box className={"StatsPage-banner"}>
        <Typography variant={"h2"} className={"StatsPage-title"}>Estadísticas</Typography>
      </Box>
    </Box>
  )
}

export default StatsPage;

import {Box} from "@mui/material";
import {BaFixLettersWhite, BaFixLogo} from "../../assets/Assets";
import "./InstallAppPage.css";

const InstallAppPage = () => {
  return (
    <Box className={"InstallAppPage"}>
      <Box className={"InstallAppPage-logo-container"}>
        <Box className={"InstallAppPage-logo"}>
          <BaFixLogo/>
        </Box>
        <Box className={"InstallAppPage-letters"}>
          <BaFixLettersWhite/>
        </Box>
      </Box>
      <img src={"https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"}
           alt={"Get it on Play Store"} className={"InstallAppPage-playstore"} onClick={() => {
        window.open("https://play.google.com/store/apps", "_blank")
      }}/>

    </Box>
  );
}

export default InstallAppPage;

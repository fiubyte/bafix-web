import {Box, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import "./AdminDashboardPage.css"
import Navbar from "../../components/Navbar/Navbar";
import {useState} from "react";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import TotalUsersChart from "../../components/TotalUsersChart/TotalUsersChart";

const AdminDashboardPage = () => {

  const [groupBy, setGroupBy] = useState<"day" | "month">("day");
  const [initialDate, setInitialDate] = useState<Dayjs>(dayjs().startOf("month"));
  const [finalDate, setFinalDate] = useState<Dayjs>(dayjs().endOf("month"));

  return (
    <Box className={"AdminDashboardPage"}>
      <Navbar isUserLoggedIn={true}/>
      <Box className={"AdminDashboardPage-banner"}>
        <Typography variant={"h2"} className={"StatsPage-title"}>Dashboard</Typography>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className={"AdminDashboardPage-filter-container"}>
          <Box className={"AdminDashboardPage-filter"}>
            <InputLabel id="groupby-label">Agrupar por</InputLabel>
            <Select
              labelId={"groupby-label"}
              variant={"outlined"}
              size={"small"}
              autoWidth
              className={"AdminDashboardPage-groupby"}
              value={groupBy}
              onChange={(event) => setGroupBy(event.target.value as "day" | "month")}
            >
              <MenuItem value={"day"}>Día</MenuItem>
              <MenuItem value={"month"}>Mes</MenuItem>
            </Select>
          </Box>
          <Box className={"AdminDashboardPage-filter"}>
            <InputLabel id="initial-date-label">Período inicio:</InputLabel>
            <DatePicker
              className={"AdminDashboardPage-date-picker"}
              value={initialDate}
              onChange={(date) => setInitialDate(date as Dayjs)}
              maxDate={finalDate}
            />
          </Box>
          <Box className={"AdminDashboardPage-filter"}>
            <InputLabel id="final-date-label">Período fin:</InputLabel>
            <DatePicker
              className={"AdminDashboardPage-date-picker"}
              value={finalDate}
              onChange={(date) => setFinalDate(date as Dayjs)}
              minDate={initialDate}
            />
          </Box>
        </Box>
      </LocalizationProvider>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TotalUsersChart groupBy={groupBy} initialDate={initialDate} finalDate={finalDate}/>
        </Grid>
        <Grid item xs={6}>

        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminDashboardPage;

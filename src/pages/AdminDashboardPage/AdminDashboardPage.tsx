import {Box, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import "./AdminDashboardPage.css"
import Navbar from "../../components/Navbar/Navbar";
import {useState} from "react";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import TotalUsersChart from "../../components/TotalUsersChart/TotalUsersChart";
import TotalProvidersChart from "../../components/TotalProvidersChart/TotalProvidersChart";
import TopConversionRateChart from "../../components/TopConversionRateChart/TopConversionRateChart";
import TopContactsChart from "../../components/TopContactsChart/TopContactsChart";
import TopServicesChart from "../../components/TopServicesChart/TopServicesChart";
import TopProvidersChart from "../../components/TopProvidersChart/TopProvidersChart";

const AdminDashboardPage = () => {

  const [groupBy, setGroupBy] = useState<"day" | "month">("day");
  const [initialDate, setInitialDate] = useState<Dayjs>(dayjs().startOf("month"));
  const [finalDate, setFinalDate] = useState<Dayjs>(dayjs());

  const minDate = (d1: Dayjs, d2: Dayjs) => {
    return d1.isBefore(d2) ? d1 : d2;
  }

  return (
    <Box className={"AdminDashboardPage"}>
      <Navbar isUserLoggedIn={true}/>
      <Box className={"AdminDashboardPage-banner"}>
        <Typography variant={"h2"} className={"AdminDashboardPage-title"}>Dashboard</Typography>
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
              maxDate={minDate(finalDate, dayjs())}
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
      <Grid container spacing={2} className={"AdminDashboardPage-charts"}>
        <Grid item xs={4}>
          <TopContactsChart initialDate={initialDate} finalDate={finalDate}/>
        </Grid>
        <Grid item xs={4}>
          <TopServicesChart initialDate={initialDate} finalDate={finalDate}/>
        </Grid>
        <Grid item xs={4}>
          <TopProvidersChart initialDate={initialDate} finalDate={finalDate}/>
        </Grid>
        <Grid item xs={6}>
          <TotalUsersChart groupBy={groupBy} initialDate={initialDate} finalDate={finalDate}/>
        </Grid>
        <Grid item xs={6}>
          <TotalProvidersChart groupBy={groupBy} initialDate={initialDate} finalDate={finalDate}/>
        </Grid>
        <Grid item xs={12}>
          <TopConversionRateChart initialDate={initialDate} finalDate={finalDate}/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminDashboardPage;

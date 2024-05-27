import {Box, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import "./StatsPage.css"
import Navbar from "../../components/Navbar/Navbar";
import {useState} from "react";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

const StatsPage = () => {

  const [groupBy, setGroupBy] = useState<"day" | "month">("day");
  const [initialDate, setInitialDate] = useState<Dayjs>(dayjs());
  const [finalDate, setFinalDate] = useState<Dayjs>(dayjs().add(1, "day"));

  return (
    <Box className={"StatsPage"}>
      <Navbar isUserLoggedIn={true}/>
      <Box className={"StatsPage-banner"}>
        <Typography variant={"h2"} className={"StatsPage-title"}>Estadísticas</Typography>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className={"StatsPage-filter-container"}>
          <Box className={"StatsPage-filter"}>
            <InputLabel id="groupby-label">Agrupar por</InputLabel>
            <Select
              labelId={"groupby-label"}
              variant={"outlined"}
              size={"small"}
              autoWidth
              className={"StatsPage-groupby"}
              value={groupBy}
              onChange={(event) => setGroupBy(event.target.value as "day" | "month")}
            >
              <MenuItem value={"day"}>Día</MenuItem>
              <MenuItem value={"month"}>Mes</MenuItem>
            </Select>
          </Box>
          <Box className={"StatsPage-filter"}>
            <InputLabel id="initial-date-label">Período inicio:</InputLabel>
            <DatePicker
              className={"StatsPage-date-picker"}
              value={initialDate}
              onChange={(date) => setInitialDate(date as Dayjs)}
              maxDate={finalDate}
            />
          </Box>
          <Box className={"StatsPage-filter"}>
            <InputLabel id="final-date-label">Período fin:</InputLabel>
            <DatePicker
              className={"StatsPage-date-picker"}
              value={finalDate}
              onChange={(date) => setFinalDate(date as Dayjs)}
              minDate={initialDate}
            />
          </Box>
        </Box>
      </LocalizationProvider>
    </Box>
  )
}

export default StatsPage;

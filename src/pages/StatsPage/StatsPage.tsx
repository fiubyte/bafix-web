import {Box, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import "./StatsPage.css"
import Navbar from "../../components/Navbar/Navbar";
import {useEffect, useState} from "react";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import ConversionRateChart from "../../components/ConversionRateChart/ConversionRateChart";
import TopUsersChart from "../../components/TopUsersChart/TopUsersChart";
import {ServiceView} from "../../models/ServiceView";
import {ServiceContact} from "../../models/ServiceContact";
import config from "../../config";
import axios from "axios";

const StatsPage = () => {

  const [groupBy, setGroupBy] = useState<"day" | "month">("day");
  const [initialDate, setInitialDate] = useState<Dayjs>(dayjs());
  const [finalDate, setFinalDate] = useState<Dayjs>(dayjs().add(1, "day"));
  const [views, setViews] = useState<ServiceView[]>([]);
  const [filteredViews, setFilteredViews] = useState<ServiceView[]>([]);
  const [contacts, setContacts] = useState<ServiceContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ServiceContact[]>([]);

  useEffect(() => {
    axios.get(`${config.apiUrl}/users/views`,
      {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}})
      .then((response) => {
          setViews(response.data);
          console.log(response.data)
        }
      ).catch((error) => {
      console.error(error);
    });
    axios.get(`${config.apiUrl}/users/contacts`,
      {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}})
      .then((response) => {
          setContacts(response.data);
          console.log(response.data)
        }
      ).catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    const filteredViews = views.filter(view => dayjs(view.timestamp).isAfter(initialDate) && dayjs(view.timestamp).isBefore(finalDate));
    setFilteredViews(filteredViews);
  }, [views, initialDate, finalDate]);

  useEffect(() => {
    const filteredContacts = contacts.filter(contact => dayjs(contact.timestamp).isAfter(initialDate) && dayjs(contact.timestamp).isBefore(finalDate));
    setFilteredContacts(filteredContacts);
  }, [contacts, initialDate, finalDate]);

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
      <Box className={"StatsPage-chart"}>
        <ConversionRateChart views={filteredViews} contacts={filteredContacts} groupBy={groupBy}/>
      </Box>
      <Box className={"StatsPage-chart"}>
        <TopUsersChart contacts={filteredContacts}/>
      </Box>
    </Box>
  )
}

export default StatsPage;

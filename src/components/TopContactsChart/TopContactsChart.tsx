"use client";

import {Card} from '@tremor/react';
import {Dayjs} from "dayjs";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../config";
import {Box, Typography} from "@mui/material";
import "./TopContactsChart.css"

interface TopContactsChartProps {
  initialDate: Dayjs;
  finalDate: Dayjs;
}

interface TopContactsData {
  user_id: number;
  user_name: string;
  user_surame: string;
  photo_url: string;
  contacts: number;
}

const TopContactsChart = ({initialDate, finalDate}: TopContactsChartProps) => {

  const [data, setData] = useState<TopContactsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${config.apiUrl}/services/metrics/top_contacts/?start_date=${initialDate.format().slice(0, 19)}&end_date=${finalDate.format().slice(0, 19)}`, {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}}).then(r => {
      setData(r.data);
      setLoading(false);
    }).catch(e => {
      console.error(e);
    })
  }, [initialDate, finalDate]);

  const renderUser = (user: TopContactsData) => {
    return (
      <Box className={"TopContactsChart-user"}>
        <img src={user.photo_url} alt={`${user.user_name} ${user.user_surame}`} className={"TopContactsChart-img"}/>
        <Typography variant={"body1"}>{user.user_name} {user.user_surame} - {user.contacts} contactos</Typography>
      </Box>
    )
  }

  if (loading) {
    return (
      <Card>
        <h3 className="text-lg font-medium text-tremor-content-strong">
          Top 5 usuarios que más contactaron
        </h3>
        <Box style={{height: "10rem", display: "flex", alignItems:"center"}}>
          <Typography variant={"h6"} style={{margin: "auto"}}>Cargando...</Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-medium text-tremor-content-strong">
        Top 5 usuarios que más contactaron
      </h3>
      <Box className={"TopContactsChart-chart"}>
        {data.map(item => renderUser(item))}
      </Box>
    </Card>
  );
}

export default TopContactsChart;

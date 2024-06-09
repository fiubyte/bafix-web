"use client";

import {Card} from '@tremor/react';
import {Dayjs} from "dayjs";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../config";
import {Box, Typography} from "@mui/material";
import "./TopProvidersChart.css"

interface TopContactsChartProps {
  initialDate: Dayjs;
  finalDate: Dayjs;
}

interface TopProvidersData {
  user_name: string;
  user_surame: string;
  photo_url: string;
}

const TopProvidersChart = ({initialDate, finalDate}: TopContactsChartProps) => {

  const [data, setData] = useState<TopProvidersData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${config.apiUrl}/users/metric/top_providers/?start_date=${initialDate.format().slice(0, 19)}&end_date=${finalDate.format().slice(0, 19)}`, {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}}).then(r => {
      setData(r.data);
      setLoading(false);
    }).catch(e => {
      console.error(e);
    })
  }, [initialDate, finalDate]);

  const renderUser = (user: TopProvidersData) => {
    return (
      <Box className={"TopContactsChart-user"}>
        <img src={user.photo_url} alt={`${user.user_name} ${user.user_surame}`} className={"TopProvidersChart-image"}/>
        <Typography variant={"body1"}>{user.user_name} {user.user_surame}</Typography>
      </Box>
    )
  }

  if (loading) {
    return (
      <Card>
        <h3 className="text-lg font-medium text-tremor-content-strong">
          Top 5 mejores proveedores
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
        Top 5 mejores proveedores
      </h3>
      <Box className={"TopContactsChart-chart"}>
        {data.map(item => renderUser(item))}
      </Box>
    </Card>
  );
}

export default TopProvidersChart;

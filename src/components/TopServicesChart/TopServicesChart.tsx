"use client";

import {Card} from '@tremor/react';
import {Dayjs} from "dayjs";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../config";
import {Box, Typography} from "@mui/material";
import "./TopServicesChart.css"
import {useNavigate} from "react-router-dom";

interface TopContactsChartProps {
  initialDate: Dayjs;
  finalDate: Dayjs;
}

interface TopServicesData {
  service_id: number;
  title: string;
  photo_url: string;
}

const TopServicesChart = ({initialDate, finalDate}: TopContactsChartProps) => {

  const [data, setData] = useState<TopServicesData[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`${config.apiUrl}/services/metrics/top_services/?start_date=${initialDate.format().slice(0, 19)}&end_date=${finalDate.format().slice(0, 19)}`, {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}}).then(r => {
      setData(r.data);
      setLoading(false);
    }).catch(e => {
      console.error(e);
    })
  }, [initialDate, finalDate]);

  const renderService = (service: TopServicesData) => {
    return (
      <Box className={"TopServicesChart-service"}
           onClick={() => navigate(`/admin/servicio/${service.service_id}/detalle`)}>
        <img src={service.photo_url} alt={service.title} className={"TopServicesChart-img"}/>
        <Typography variant={"body1"}>{service.title}</Typography>
      </Box>
    )
  }

  if (loading) {
    return (
      <Card>
        <h3 className="text-lg font-medium text-tremor-content-strong">
          Top 5 mejores servicios
        </h3>
        <Box style={{height: "10rem", display: "flex", alignItems: "center"}}>
          <Typography variant={"h6"} style={{margin: "auto"}}>Cargando...</Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-medium text-tremor-content-strong">
        Top 5 mejores servicios
      </h3>
      <Box className={"TopServicesChart-chart"}>
        {data.map(item => renderService(item))}
      </Box>
    </Card>
  );
}

export default TopServicesChart;

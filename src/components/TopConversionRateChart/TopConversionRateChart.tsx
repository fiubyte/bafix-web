"use client";
import {BarChart, Card} from "@tremor/react";
import {Grid, Link} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../config";
import {Dayjs} from "dayjs";

interface TopConversionRateChartProps {
  initialDate: Dayjs;
  finalDate: Dayjs;
}

interface TopConversionRateData {
  service_id: number;
  title: string;
  conversion_rate: number;
}

interface TopConversionRateChartData {
  IdServicio: number;
  Servicio: string;
  "Tasa de conversion": number;
}

const TopConversionRateChart = ({initialDate, finalDate}: TopConversionRateChartProps) => {
  const [data, setData] = useState<TopConversionRateChartData[]>([]);

  useEffect(() => {
    axios.get(`${config.apiUrl}/services/metrics/conversion_rate/?start_date=${initialDate.format().slice(0, 19)}&end_date=${finalDate.format().slice(0, 19)}`, {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}})
      .then(r => {
        setData(r.data.map((d: TopConversionRateData) => ({
          IdServicio: d.service_id,
          Servicio: d.title,
          "Tasa de conversion": d.conversion_rate
        })));
      }).catch(e => {
      console.error(e)
    });
  }, [initialDate, finalDate]);

  const dataFormatter = (value: number) => {
    return `${value.toFixed(1)}%`;
  }

  const renderTopItem = (index: number, item: TopConversionRateChartData) => {
    return (
      <Link
        href={`/admin/servicio/${item.IdServicio}/detalle`}
        style={{textDecoration: "none", color: "inherit"}}
        variant={"body1"}><span
        style={{fontWeight: "bold"}}>{index}</span> - {item.Servicio}: {dataFormatter(item["Tasa de conversion"])}
      </Link>
    )
  }

  return (
    <Card>
      <h3 className="text-lg font-medium text-tremor-content-strong">
        Top 10 servicios con mayor tasa de conversión
      </h3>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <BarChart
            data={data}
            index="Servicio"
            categories={['Tasa de conversion']}
            colors={['blue']}
            valueFormatter={dataFormatter}
            yAxisWidth={48}
            onValueChange={(v) => console.log(v)}
            showXAxis={false}
          />
        </Grid>
        <Grid item xs={3} style={{display: "flex", flexDirection: "column"}}>
          {data.slice(0, 5).map((d, i) => renderTopItem(i + 1, d))}
        </Grid>
        <Grid item xs={3} style={{display: "flex", flexDirection: "column"}}>
          {data.slice(5, 10).map((d, i) => renderTopItem(i + 6, d))}
        </Grid>
      </Grid>
    </Card>
  )
};

export default TopConversionRateChart;

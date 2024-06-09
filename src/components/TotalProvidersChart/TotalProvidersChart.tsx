"use client";

import {Card, LineChart} from '@tremor/react';
import {Dayjs} from "dayjs";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../config";

interface TotalProvidersChartProps {
  groupBy: "day" | "month";
  initialDate: Dayjs;
  finalDate: Dayjs;
}

interface TotalProvidersData {
  timestamp: string;
  total_providers: number;
}

interface TotalProvidersChartData {
  Fecha: string;
  Proveedores: number;
}

const TotalProvidersChart = ({groupBy, initialDate, finalDate}: TotalProvidersChartProps) => {

  const [data, setData] = useState<TotalProvidersData[]>([]);
  const [chartData, setChartData] = useState<TotalProvidersChartData[]>([]);

  const fillChartDataDay = () => {
    const dates: string[] = [];
    let currentDate = initialDate;
    while (currentDate.isBefore(finalDate) || currentDate.isSame(finalDate, 'day')) {
      dates.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
    }
    const cData: TotalProvidersChartData[] = [];
    dates.forEach((date, index) => {
      const existingData = data.find(item => item.timestamp.slice(0, 10) === date);
      if (existingData) {
        cData.push({Fecha: date, Proveedores: existingData.total_providers});
      } else {
        const users = index == 0 ? 0 : cData[index - 1].Proveedores;
        cData.push({Fecha: date, Proveedores: users});
      }
    });
    setChartData(cData);
  }

  const fillChartDataMonth = () => {
    const dates: string[] = [];
    let currentDate = initialDate.startOf('month');

    while (currentDate.isBefore(finalDate) || currentDate.isSame(finalDate, 'month')) {
      dates.push(currentDate.format('YYYY-MM'));
      currentDate = currentDate.add(1, 'month').startOf('month');
    }
    const cData: TotalProvidersChartData[] = [];
    dates.forEach((date, index) => {
        const total = data.filter(item => item.timestamp.slice(0, 7) == date)
          .reduce((acc, item) => acc + item.total_providers, 0);
        if (total == 0 && index > 0) {
          cData.push({Fecha: date, Proveedores: cData[index - 1].Proveedores});
        } else {
          cData.push({Fecha: date, Proveedores: total});
        }
      }
    );
    setChartData(cData);
  }

  useEffect(() => {
    axios.get(`${config.apiUrl}/users/metrics/total_providers`, {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}})
      .then(response => {
        setData(response.data);
      }).catch(error => {
      console.error(error)
    });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;
    if (groupBy === "day") {
      fillChartDataDay();
    } else {
      fillChartDataMonth();
    }
  }, [data, groupBy, initialDate, finalDate]);

  return (
    <Card className="max-w-4xl">
      <h3 className="text-lg font-medium text-tremor-content-strong">
        Evolución de la cantidad total de proveedores
      </h3>
      <LineChart
        className="h-80"
        data={chartData}
        index="Fecha"
        categories={['Proveedores']}
        colors={['rose']}
        yAxisWidth={60}
      />
    </Card>
  );
}

export default TotalProvidersChart;

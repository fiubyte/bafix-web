"use client";

import {Card, LineChart} from '@tremor/react';
import {Dayjs} from "dayjs";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../config";

interface TotalUsersChartProps {
  groupBy: "day" | "month";
  initialDate: Dayjs;
  finalDate: Dayjs;
}

interface TotalUsersData {
  timestamp: string;
  total_users: number;
}

interface TotalUsersChartData {
  Fecha: string;
  Usuarios: number;
}

const TotalUsersChart = ({groupBy, initialDate, finalDate}: TotalUsersChartProps) => {

  const [data, setData] = useState<TotalUsersData[]>([]);
  const [chartData, setChartData] = useState<TotalUsersChartData[]>([]);

  const fillChartDataDay = () => {
    const dates: string[] = [];
    let currentDate = initialDate;
    while (currentDate.isBefore(finalDate) || currentDate.isSame(finalDate, 'day')) {
      dates.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
    }
    const cData: TotalUsersChartData[] = [];
    dates.forEach((date, index) => {
      const existingData = data.find(item => item.timestamp.slice(0, 10) === date);
      if (existingData) {
        cData.push({Fecha: date, Usuarios: existingData.total_users});
      } else {
        const users = index == 0 ? 0 : cData[index - 1].Usuarios;
        cData.push({Fecha: date, Usuarios: users});
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
    const cData: TotalUsersChartData[] = [];
    dates.forEach((date, index) => {
        const total = data.filter(item => item.timestamp.slice(0, 7) == date)
          .reduce((acc, item) => acc + item.total_users, 0);
        if (total == 0 && index > 0) {
          cData.push({Fecha: date, Usuarios: cData[index - 1].Usuarios});
        } else {
          cData.push({Fecha: date, Usuarios: total});
        }
      }
    );
    setChartData(cData);
  }

  useEffect(() => {
    axios.get(`${config.apiUrl}/users/metrics/total_users`, {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}})
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
        Evolución de la cantidad total de usuarios
      </h3>
      <LineChart
        className="h-80"
        data={chartData}
        index="Fecha"
        categories={['Usuarios']}
        colors={['indigo']}
        yAxisWidth={60}
      />
    </Card>
  );
}

export default TotalUsersChart;

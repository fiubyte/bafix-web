"use client";

import {LineChart} from '@tremor/react';
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
  const [loading, setLoading] = useState<boolean>(true);

  const fillChartDataDay = () => {
    const dates: string[] = [];
    let currentDate = initialDate;
    while (currentDate.isBefore(finalDate) || currentDate.isSame(finalDate, 'day')) {
      dates.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
    }
    const cData: TotalUsersChartData[] = [];
    dates.forEach(date => {
      const existingData = data.find(item => item.timestamp.slice(0, 10) === date);
      if (existingData) {
        cData.push({Fecha: date, Usuarios: existingData.total_users});
      } else {
        cData.push({Fecha: date, Usuarios: 0});
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
    dates.forEach(date => {
        const total = data.filter(item => item.timestamp.slice(0, 7) == date)
          .reduce((acc, item) => acc + item.total_users, 0);
        cData.push({Fecha: date, Usuarios: total});
      }
    );
    setChartData(cData);
  }

  useEffect(() => {
    axios.get(`${config.apiUrl}/users/metrics/total_users`)
      .then(response => {
        setData(response.data);
      }).catch(error => { console.error(error) });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;
    setLoading(true);
    if (groupBy === "day") {
      fillChartDataDay();
    } else {
      fillChartDataMonth();
    }
    setLoading(false);
  }, [groupBy, initialDate, finalDate]);


  if (loading) {
    return (
      <LineChart
        className="h-80"
        data={[]}
        index="Fecha"
        categories={['Usuarios']}
        colors={['indigo']}
        yAxisWidth={60}
      />
    )
  }

  return (
    <LineChart
      className="h-80"
      data={chartData}
      index="Fecha"
      categories={['Usuarios']}
      colors={['indigo']}
      yAxisWidth={60}
    />
  );
}

export default TotalUsersChart;

"use client";
import {AreaChart, BarChart, Card} from "@tremor/react";
import {useEffect, useState} from "react";

const chartdata = [
  {date: "2021-01-01", type: "visit"},
  {date: "2021-01-01", type: "visit"},
  {date: "2021-01-01", type: "visit"},
  {date: "2021-01-01", type: "visit"},
  {date: "2021-01-01", type: "visit"},
  {date: "2021-01-01", type: "contact"},
  {date: "2021-01-02", type: "visit"},
  {date: "2021-01-02", type: "visit"},
  {date: "2021-01-02", type: "visit"},
  {date: "2021-01-02", type: "contact"},
  {date: "2021-01-02", type: "contact"},
  {date: "2021-01-03", type: "visit"},
  {date: "2021-01-03", type: "visit"},
  {date: "2021-01-03", type: "contact"},
  {date: "2021-01-03", type: "contact"},
  {date: "2021-01-03", type: "contact"},
  {date: "2021-01-03", type: "visit"},
  {date: "2021-01-03", type: "visit"},
  {date: "2021-01-03", type: "visit"},
  {date: "2021-01-03", type: "visit"},
  {date: "2021-01-04", type: "visit"},
  {date: "2021-01-04", type: "visit"},
  {date: "2021-01-04", type: "visit"},
  {date: "2021-01-04", type: "visit"},
  {date: "2021-01-04", type: "visit"},
  {date: "2021-01-04", type: "contact"},
  {date: "2021-01-05", type: "visit"},
  {date: "2021-01-05", type: "visit"},
  {date: "2021-01-05", type: "visit"},
  {date: "2021-01-05", type: "visit"},
  {date: "2021-01-05", type: "visit"},
  {date: "2021-01-05", type: "visit"},
  {date: "2021-01-05", type: "contact"},
  {date: "2021-01-05", type: "contact"},
  {date: "2021-01-06", type: "visit"},
  {date: "2021-01-06", type: "visit"},
  {date: "2021-01-06", type: "visit"},
  {date: "2021-01-06", type: "contact"},
  {date: "2021-01-06", type: "contact"},
  {date: "2021-01-06", type: "contact"},
  {date: "2021-01-07", type: "visit"},
  {date: "2021-01-07", type: "visit"},
  {date: "2021-01-07", type: "visit"},
  {date: "2021-01-07", type: "contact"},
  {date: "2021-01-07", type: "contact"},
  {date: "2021-01-08", type: "visit"},
  {date: "2021-01-08", type: "visit"},
  {date: "2021-01-08", type: "visit"},
  {date: "2021-01-08", type: "visit"},
  {date: "2021-01-08", type: "visit"},
  {date: "2021-01-08", type: "contact"},
  {date: "2021-01-09", type: "visit"},
  {date: "2021-01-09", type: "visit"},
  {date: "2021-01-09", type: "visit"},
  {date: "2021-01-09", type: "contact"},
  {date: "2021-01-10", type: "visit"},
  {date: "2021-01-10", type: "visit"},
  {date: "2021-01-10", type: "visit"},
  {date: "2021-01-10", type: "visit"},
  {date: "2021-01-10", type: "visit"},
  {date: "2021-01-10", type: "visit"},
  {date: "2021-01-10", type: "contact"},
  {date: "2021-01-11", type: "visit"},
  {date: "2021-01-11", type: "visit"},
  {date: "2021-01-11", type: "visit"},
  {date: "2021-01-11", type: "contact"},
  {date: "2021-01-11", type: "contact"},
  {date: "2021-01-12", type: "visit"},
  {date: "2021-01-12", type: "visit"},
  {date: "2021-01-12", type: "visit"},
  {date: "2021-01-12", type: "visit"},
  {date: "2021-01-12", type: "visit"},
  {date: "2021-01-12", type: "contact"},
  {date: "2021-01-13", type: "visit"},
  {date: "2021-01-13", type: "visit"},
  {date: "2021-01-13", type: "visit"},
  {date: "2021-01-13", type: "contact"},
  {date: "2021-01-13", type: "contact"},
  {date: "2021-01-14", type: "visit"},
  {date: "2021-01-14", type: "visit"},
  {date: "2021-01-14", type: "visit"},
  {date: "2021-01-14", type: "contact"},
  {date: "2021-01-14", type: "contact"},
  {date: "2021-01-15", type: "visit"},
  {date: "2021-01-15", type: "visit"},
  {date: "2021-01-15", type: "visit"},
  {date: "2021-01-15", type: "visit"},
  {date: "2021-01-15", type: "visit"},
  {date: "2021-01-15", type: "contact"},
  {date: "2021-01-16", type: "visit"},
  {date: "2021-01-16", type: "visit"},
  {date: "2021-01-16", type: "visit"},
  {date: "2021-01-16", type: "contact"},
  {date: "2021-01-17", type: "visit"},
  {date: "2021-01-17", type: "visit"},
  {date: "2021-01-17", type: "visit"},
  {date: "2021-01-17", type: "visit"},
  {date: "2021-01-17", type: "visit"},
  {date: "2021-01-17", type: "contact"},
  {date: "2021-01-18", type: "visit"},
  {date: "2021-01-18", type: "visit"},
  {date: "2021-01-18", type: "visit"},
  {date: "2021-01-18", type: "contact"},
  {date: "2021-01-18", type: "contact"},
  {date: "2021-01-19", type: "visit"},
  {date: "2021-01-19", type: "visit"},
  {date: "2021-01-19", type: "visit"},
  {date: "2021-01-19", type: "visit"},
  {date: "2021-01-19", type: "visit"},
  {date: "2021-01-19", type: "visit"},
  {date: "2021-01-19", type: "contact"},
  {date: "2021-01-19", type: "contact"},
  {date: "2021-01-20", type: "visit"},
  {date: "2021-01-20", type: "visit"},
  {date: "2021-01-20", type: "visit"},
  {date: "2021-01-20", type: "contact"},
  {date: "2021-01-20", type: "contact"},
  {date: "2021-01-21", type: "visit"},
  {date: "2021-01-21", type: "visit"},
  {date: "2021-01-21", type: "visit"},
  {date: "2021-01-21", type: "contact"},
  {date: "2021-01-21", type: "contact"},
  {date: "2021-01-22", type: "visit"},
  {date: "2021-01-22", type: "visit"},
  {date: "2021-01-22", type: "visit"},
  {date: "2021-01-22", type: "visit"},
  {date: "2021-01-22", type: "visit"},
  {date: "2021-01-22", type: "contact"},
  {date: "2021-01-23", type: "visit"},
  {date: "2021-01-23", type: "visit"},
  {date: "2021-01-23", type: "visit"},
  {date: "2021-01-23", type: "contact"},
  {date: "2021-01-23", type: "contact"},
  {date: "2021-01-24", type: "visit"},
  {date: "2021-01-24", type: "visit"},
  {date: "2021-01-24", type: "visit"},
  {date: "2021-01-24", type: "visit"},
  {date: "2021-01-24", type: "visit"},
  {date: "2021-01-24", type: "contact"},
  {date: "2021-01-25", type: "visit"},
  {date: "2021-01-25", type: "visit"},
  {date: "2021-01-25", type: "visit"},
  {date: "2021-01-25", type: "contact"},
  {date: "2021-01-25", type: "contact"},
  {date: "2021-01-26", type: "visit"},
  {date: "2021-01-26", type: "visit"},
  {date: "2021-01-26", type: "visit"},
  {date: "2021-01-26", type: "visit"},
  {date: "2021-01-26", type: "visit"},
  {date: "2021-01-26", type: "contact"},
  {date: "2021-01-27", type: "visit"},
  {date: "2021-01-27", type: "visit"},
  {date: "2021-01-27", type: "visit"},
  {date: "2021-01-27", type: "contact"},
  {date: "2021-01-28", type: "visit"},
  {date: "2021-01-28", type: "visit"},
  {date: "2021-01-28", type: "visit"},
  {date: "2021-01-28", type: "contact"},
  {date: "2021-01-28", type: "contact"},
  {date: "2021-01-29", type: "visit"},
  {date: "2021-01-29", type: "visit"},
  {date: "2021-01-29", type: "visit"},
  {date: "2021-01-29", type: "visit"},
  {date: "2021-01-29", type: "visit"},
  {date: "2021-01-29", type: "contact"},
  {date: "2021-01-29", type: "contact"},
  {date: "2021-01-30", type: "visit"},
  {date: "2021-01-30", type: "visit"},
  {date: "2021-01-30", type: "visit"},
  {date: "2021-01-30", type: "contact"},
  {date: "2021-01-30", type: "contact"},
  {date: "2021-01-31", type: "visit"},
  {date: "2021-01-31", type: "visit"},
  {date: "2021-01-31", type: "visit"},
  {date: "2021-01-31", type: "visit"},
  {date: "2021-01-31", type: "visit"},
  {date: "2021-01-31", type: "contact"}
];

interface ChartDataItem {
  date: string;
  Visitas: number;
  Contactos: number;
}

const ChartExample = () => {

  const [data, setData] = useState<ChartDataItem[]>([]);

  useEffect(() => {
    const chartData = chartdata.reduce((acc, item) => {
      const date = item.date;
      const type = item.type;
      if (!acc[date]) {
        acc[date] = {date: date, Visitas: 0, Contactos: 0};
      }
      if (type === "visit") {
        acc[date].Visitas++;
      } else {
        acc[date].Contactos++;
      }
      return acc;
    }, {} as Record<string, ChartDataItem>);

    setData(Object.values(chartData));
  }, []);


  return (
    <Card className="max-w-4xl">
      <h3 className="text-lg font-medium text-tremor-content-strong">
        Tasa de conversión
      </h3>
      <BarChart
        className="mt-2 h-80"
        data={data}
        index="date"
        categories={["Visitas", "Contactos"]}
        colors={["amber", "rose"]}
        yAxisWidth={33}
      />
    </Card>
  );
}

export default ChartExample;

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
];

interface ChartDataItem {
  date: string;
  visitCount: number;
  contactCount: number;
}

const ChartExample = () => {

  const [data, setData] = useState<ChartDataItem[]>([]);

  useEffect(() => {
    const chartData = chartdata.reduce((acc, item) => {
      const date = item.date;
      const type = item.type;
      if (!acc[date]) {
        acc[date] = {date: date, visitCount: 0, contactCount: 0};
      }
      if (type === "visit") {
        acc[date].visitCount++;
      } else {
        acc[date].contactCount++;
      }
      return acc;
    }, {} as Record<string, ChartDataItem>);

    setData(Object.values(chartData));
  }, []);


  return (
    <Card className="max-w-4xl">
      <BarChart
        className="mt-2 h-80"
        data={data}
        index="date"
        categories={["visitCount", "contactCount"]}
        colors={["indigo", "rose"]}
        yAxisWidth={33}
      />
    </Card>
  );
}

export default ChartExample;

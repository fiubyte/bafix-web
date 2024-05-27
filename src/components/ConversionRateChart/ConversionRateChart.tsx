"use client";

import {ServiceView} from "../../models/ServiceView";
import {useEffect, useState} from "react";
import {ServiceContact} from "../../models/ServiceContact";
import {BarChart, Card} from "@tremor/react";

interface ConversionRateChartProps {
  views: ServiceView[];
  contacts: ServiceContact[];
  groupBy: "day" | "month";
}

interface ConversionRateData {
  date: string;
  Visitas: number;
  Contactos: number;
}

const ConversionRateChart = ({views, contacts, groupBy}: ConversionRateChartProps) => {

  const [data, setData] = useState<ConversionRateData[]>([]);

  useEffect(() => {
    const groupedData: ConversionRateData[] = [];
    views.forEach(view => {
      const date = groupBy === "day" ? view.timestamp.slice(0, 10) : view.timestamp.slice(0, 7);
      const existingData = groupedData.find(item => item.date === date);
      if (existingData) {
        existingData.Visitas++;
      } else {
        groupedData.push({date, Visitas: 1, Contactos: 0});
      }
    });
    contacts.forEach(contact => {
      const date = groupBy === "day" ? contact.timestamp.slice(0, 10) : contact.timestamp.slice(0, 7);
      const existingData = groupedData.find(item => item.date === date);
      if (existingData) {
        existingData.Contactos++;
      } else {
        groupedData.push({date, Visitas: 0, Contactos: 1});
      }
    });
    setData(groupedData);
  }, [views, groupBy]);

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

export default ConversionRateChart;

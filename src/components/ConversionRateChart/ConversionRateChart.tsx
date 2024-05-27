"use client";

import {ServiceView} from "../../models/ServiceView";
import {useEffect, useState} from "react";
import {ServiceContact} from "../../models/ServiceContact";

interface ConversionRateChartProps {
  views: ServiceView[];
  contacts: ServiceContact[];
  groupBy: "day" | "month";
}

interface ConversionRateData {
  date: string;
  views: number;
  contacts: number;
}

const ConversionRateChart = ({views, contacts, groupBy}: ConversionRateChartProps) => {

  const [data, setData] = useState<ConversionRateData[]>([]);

  useEffect(() => {
    const groupedData: ConversionRateData[] = [];
    views.forEach(view => {
      const date = groupBy === "day" ? view.timestamp.toISOString().slice(0, 10) : view.timestamp.toISOString().slice(0, 7);
      const existingData = groupedData.find(item => item.date === date);
      if (existingData) {
        existingData.views++;
      } else {
        groupedData.push({date, views: 1, contacts: 0});
      }
    });
    contacts.forEach(contact => {
      const date = groupBy === "day" ? contact.timestamp.toISOString().slice(0, 10) : contact.timestamp.toISOString().slice(0, 7);
      const existingData = groupedData.find(item => item.date === date);
      if (existingData) {
        existingData.contacts++;
      } else {
        groupedData.push({date, views: 0, contacts: 1});
      }
    });
    setData(groupedData);
  }, [views, groupBy]);
}

export default ConversionRateChart;

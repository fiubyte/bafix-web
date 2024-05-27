"use client";

import {ServiceView} from "../../models/ServiceView";
import {useEffect, useState} from "react";

interface ConversionRateChartProps {
  views: ServiceView[];
  groupBy: "day" | "month";
}

interface ConversionRateData {
  date: string;
  views: number;
}

const ConversionRateChart = ({views, groupBy}: ConversionRateChartProps) => {

  const [data, setData] = useState<ConversionRateData[]>([]);

  useEffect(() => {
    const groupedData: ConversionRateData[] = [];
    views.forEach(view => {
      const date = groupBy === "day" ? view.timestamp.toISOString().slice(0, 10) : view.timestamp.toISOString().slice(0, 7);
      const existingData = groupedData.find(item => item.date === date);
      if (existingData) {
        existingData.views++;
      } else {
        groupedData.push({date, views: 1,});
      }
    });
    setData(groupedData);
  }, [views, groupBy]);
}

export default ConversionRateChart;

"use client";

import {ServiceView} from "../../models/ServiceView";

interface ConversionRateChartProps {
  views: ServiceView[];
  groupBy: "day" | "month";
}

const ConversionRateChart = ({views, groupBy}: ConversionRateChartProps) => {

}

export default ConversionRateChart;

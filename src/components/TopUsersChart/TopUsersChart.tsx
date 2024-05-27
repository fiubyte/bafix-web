"use client";

import {useEffect, useState} from "react";
import {Card, DonutChart} from "@tremor/react";
import {Grid} from "@mui/material";
import {ServiceContact} from "../../models/ServiceContact";

interface TopUsersChartProps {
  contacts: ServiceContact[];
}

interface TopUsersData {
  name: string;
  value: number;
}

const TopUsersChart = ({contacts}: TopUsersChartProps) => {
  const [data, setData] = useState<TopUsersData[]>([]);

  useEffect(() => {
    const groupedData: TopUsersData[] = [];
    contacts.forEach(contact => {
      const existingData = groupedData.find(item => item.name === contact.user_id.toString());
      if (existingData) {
        existingData.value++;
      } else {
        groupedData.push({name: contact.user_id.toString(), value: 1});
      }
    });
    const sortedData = groupedData.sort((a, b) => b.value - a.value).slice(0, 5);
    setData(sortedData);
  }, [contacts]);

  return (
    <Card className="max-w-4xl">
      <h3 className="text-lg font-medium text-tremor-content-strong">
        Top 5 usuarios que más te contactaron
      </h3>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <DonutChart
            variant="pie"
            data={data}
              className="mt-2 h-80 w-80"
          />
        </Grid>
      </Grid>

    </Card>
  );

}

export default TopUsersChart;

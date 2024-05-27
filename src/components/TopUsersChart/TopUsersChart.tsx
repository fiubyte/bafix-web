"use client";

import {useEffect, useState} from "react";
import {Card, DonutChart} from "@tremor/react";
import {Grid, Typography} from "@mui/material";
import {ServiceContact} from "../../models/ServiceContact";
import {User} from "../../models/User";
import config from "../../config";
import axios from "axios";
import "./TopUsersChart.css";

interface TopUsersChartProps {
  contacts: ServiceContact[];
}

interface TopUsersData {
  name: string;
  photo_url: string;
  value: number;
}

const TopUsersChart = ({contacts}: TopUsersChartProps) => {
  const [data, setData] = useState<TopUsersData[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const groupedData: TopUsersData[] = [];
    contacts.forEach(contact => {
      const existingData = groupedData.find(item => item.name === contact.user_id.toString());
      if (existingData) {
        existingData.value++;
      } else {
        groupedData.push({name: contact.user_id.toString(), value: 1, photo_url: ""});
      }
    });
    const sortedData = groupedData.sort((a, b) => b.value - a.value).slice(0, 5);
    const userIds = sortedData.map(item => item.name).join(",");
    axios.get(`${config.apiUrl}/users?user_ids=${userIds}`,
      {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}})
      .then((response) => {
          setUsers(response.data);
          const finalData = sortedData.map(item => {
            const user = users.find(user => user.id.toString() === item.name);
            return {name: user?.name || item.name, value: item.value, photo_url: user?.profile_photo_url || ""};
          });
          setData(finalData);
        }
      ).catch((error) => {
      console.error(error);
    });
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
        <Grid item xs={6}>
          <Grid container spacing={2}>
            {data.map((item, index) => (
              <Grid item xs={12} key={index}>
                <img src={item.photo_url} alt={item.name} className={"TopUsersChart-photo"}/>
                <Typography variant={"h4"}>{item.name} - {item.value} contactos</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );

}

export default TopUsersChart;

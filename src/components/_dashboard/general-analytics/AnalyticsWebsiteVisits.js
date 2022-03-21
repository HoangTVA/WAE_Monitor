/* eslint-disable prettier/prettier */
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BaseOptionChart } from '../../charts';
// ----------------------------------------------------------------------


const MONTHLY_CONSUMPTION = {
  year: 0,
  electricity: 0,
  water: 0
};

// const data = axios.get("/chart").then(res => {
//   console.log(res.data);
//   }
// )

// get data using axios
// init an arr with monthly consumptions obj
// add to chart data
const CHART_DATA = [
  ["Month", "Electricity", "Water"],
  ["Jan", 1360, 550],
  ["Feb", 2010, 700],
  ["Mar", 2510, 600],
  ["Apr", 3010, 900],
  ["May", 1910, 400],
  ["Jun", 1503, 300],
  ["Jul", 1010, 400],
  ["Aug", 3010, 900],
  ["Sep", 1910, 400],
  ["Oct", 1503, 300],
  ["Nov", 1010, 400],
  ["Dec", 710, 400]
]

// const options = {
//   chart: {
//     title: "Box Office Earnings in First Two Weeks of Opening",
//     subtitle: "in millions of dollars (USD)",
//   },
// };

// const CHART_DATA = [
//   {
//     name: 'Team A',
//     type: 'column',
//     data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
//   },
//   {
//     name: 'Team B',
//     type: 'area',
//     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
//   },
//   {
//     name: 'Team C',
//     type: 'line',
//     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
//   }
// ];

export default function AnalyticsWebsiteVisits() {
  const [data, setData] = useState([]);
  const getChartData = async () => {
    console.log("bruhhhhhhhhhhhh")
    try {
        const response = await axios.get('/chart', {
          params: { meterId: 9, year: 2022 }
        }).then(res => setData(res.data));
        console.log(response.data);
      } 
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <Card>
      <CardHeader title="Total Usage" subheader="" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <Chart chartType="Bar" data={CHART_DATA} height="364px" />
      </Box>
    </Card>
  );
}

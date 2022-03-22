// material
import { Card, CardHeader, Box } from '@material-ui/core';
import { DatePicker } from '@material-ui/lab';
//
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function AnalyticsWebsiteVisits() {
  const [chartData, setChartData] = useState(['Month', 'Electricity', 'Water']);
  const [year, setYear] = useState(2022);

  const handleGetChartData = () => {
    try {
      const response = axios
        .get('/brands/report/all', {
          params: { year }
        })
        .then((res) => setChartData(res.data));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetChartData();
  }, [year]);

  return (
    <Card>
      <CardHeader title="Total Usage" subheader="" />
      <DatePicker views={['year']} label="Year only" onChange={(date) => setYear(date.year())} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <Chart chartType="Bar" data={chartData} height="364px" />
      </Box>
    </Card>
  );
}

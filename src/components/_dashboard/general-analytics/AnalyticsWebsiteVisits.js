// material
import { Card, CardHeader, Box, TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/lab';
//
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { yearsToMonths } from 'date-fns';

// ----------------------------------------------------------------------

export default function AnalyticsWebsiteVisits() {
  const [chartData, setChartData] = useState(['Month', 'Electricity', 'Water']);
  const [year, setYear] = useState(new Date().getFullYear());
  const [value, setValue] = useState(new Date());

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

      <DatePicker
        label="Select Year:"
        views={['year']}
        value={value}
        TextFieldComponent={() => null}
        onChange={(newValue) => {
          setYear(newValue.getFullYear());
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <Chart chartType="Bar" data={chartData} height="364px" />
      </Box>
    </Card>
  );
}

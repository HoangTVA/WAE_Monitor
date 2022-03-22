// /* eslint-disable prettier/prettier */
// import { merge } from 'lodash';
// import { useParams, useLocation } from 'react-router-dom';
// // material
// import { Card, CardHeader, Box } from '@material-ui/core';
// //
// import { Chart } from 'react-google-charts';
// import axios from 'axios';
// import Datetime from 'react-datetime';
// import { useState, useEffect } from 'react';
// import { BaseOptionChart } from '../../charts';

// // ----------------------------------------------------------------------

// export default function BarChart() {
//     const { id } = useParams();
//     const { name } = useParams();
//     const { type } = useParams();
//   const [chartData, setChartData] = useState(['Month', 'Electricity', 'Water']);
//   const [year, setYear] = useState(2022);

//   const handleGetChartData = () => {
//     try {
//         const queryParam;
//         if (type === "stores") {
//             qu
//         }
//       const response = axios
//         .get(`/${type}/report`, {
//           params: { storeId, year }
//         })
//         .then((res) => setChartData(res.data));
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     handleGetChartData();
//   }, [year]);

//   return (
//     <Card>
//       <CardHeader title="Total Usage" subheader={name} />
//       <Datetime dateFormat="YYYY" onChange={(date) => setYear(date.year())} />
//       <Box sx={{ p: 3, pb: 1 }} dir="ltr">
//         <Chart chartType="Bar" data={chartData} height="364px" />
//       </Box>
//     </Card>
//   );
// }

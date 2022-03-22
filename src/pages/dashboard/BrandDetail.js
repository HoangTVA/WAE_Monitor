import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Chart } from 'react-google-charts';
import { DatePicker } from '@material-ui/lab';
import axios from 'axios';
import { Container, Card, Box, CardHeader, Button, TextField } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBrandList } from '../../redux/slices/brand';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import BrandDetailForm from '../../components/_dashboard/brand/BrandDetailForm';

// ----------------------------------------------------------------------

export default function BrandCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { brandId } = useParams();
  const { brandList } = useSelector((state) => state.brand);
  const currentBrand = brandList.find((brand) => brand.id.toString() === brandId);
  const [year, setYear] = useState(new Date().getFullYear());
  const [value, setValue] = useState(new Date());
  const [chartData, setChartData] = useState(['Month', 'Electricity', 'Water']);

  useEffect(() => {
    handleGetChartData();
    dispatch(getBrandList());
  }, [dispatch, year]);

  const handleGetChartData = () => {
    try {
      const response = axios
        .get('/brands/report', {
          params: { Bid: currentBrand.id, year }
        })
        .then((res) => setChartData(res.data));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page title="Brand: Detail | WAEM">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Brand Detail"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Brand', href: PATH_DASHBOARD.brand.list },
            { name: 'Detail' }
          ]}
        />
        <BrandDetailForm currentBrand={currentBrand} />
        <Card>
          <CardHeader title="Total Brand Usage" subheader={currentBrand.name} />
          <DatePicker
            label="Select Year:"
            readOnly
            views={['year']}
            value={value}
            TextFieldComponent={() => null}
            onChange={(newValue) => {
              setYear(newValue.getFullYear());
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <Box sx={{ p: 2, pb: 1 }} dir="ltr">
            <Chart chartType="Bar" data={chartData} height="364px" />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

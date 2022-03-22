import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container, Card, Box, CardHeader, Button, TextField } from '@material-ui/core';
// redux
import { Chart } from 'react-google-charts';
import { DatePicker } from '@material-ui/lab';
import axios from 'axios';
import { useDispatch, useSelector } from '../../redux/store';
import { getStoreList } from '../../redux/slices/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import StoreDetailForm from '../../components/_dashboard/store/StoreDetailForm';
// ----------------------------------------------------------------------

export default function StoreCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { storeId } = useParams();
  const { storeList } = useSelector((state) => state.store);
  const currentStore = storeList.find((store) => store.id.toString() === storeId);
  const [chartData, setChartData] = useState(['Month', 'Electricity', 'Water']);
  const [year, setYear] = useState(new Date().getFullYear());
  const [value, setValue] = useState(new Date());

  const handleGetChartData = () => {
    try {
      const response = axios
        .get('/stores/report', {
          params: { storeId: currentStore.id, year }
        })
        .then((res) => setChartData(res.data));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetChartData();
    dispatch(getStoreList());
  }, [dispatch, year]);

  return (
    <Page title="Store: Detail | WAEM">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Store Detail"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Store', href: PATH_DASHBOARD.store.list },
            { name: 'Detail' }
          ]}
        />
        <StoreDetailForm currentStore={currentStore} />
        <Card>
          <CardHeader title="Total Store Usage" subheader={currentStore.sName} />
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
            <Chart chartType="Line" data={chartData} height="364px" />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

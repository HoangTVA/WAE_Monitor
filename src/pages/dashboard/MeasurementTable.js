import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { filter, includes, orderBy } from 'lodash';
// material
import { Backdrop, Container, Typography, CircularProgress, Stack } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getMeasurementList } from '../../redux/slices/measurement';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { MeasurementList } from '../../components/_dashboard/measurement';

// ----------------------------------------------------------------------

export default function MeasurementTable() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { measurementList } = useSelector((state) => state.measurement);
  useEffect(() => {
    dispatch(getMeasurementList());
  }, [dispatch]);

  return (
    <Page title="Measurement | WAEM">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Shop"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Measurement',
              href: PATH_DASHBOARD.measurement.root
            },
            { name: 'Table' }
          ]}
        />
        <MeasurementList measurementList={measurementList} />
      </Container>
    </Page>
  );
}

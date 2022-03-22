import { useEffect } from 'react';

import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Select,
  TextField,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  Input
} from '@material-ui/core';
// utils
import axios from '../../../utils/axios';

// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getStoreList } from '../../../redux/slices/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function MeterNewForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { storeList } = useSelector((state) => state.store);
  const currentStore = storeList.filter((store) => store.id);
  console.log(currentStore[0].id);

  useEffect(() => {
    dispatch(getStoreList());
  }, [dispatch]);

  const NewMeterSchema = Yup.object().shape({
    mName: Yup.string().required('Name is required'),
    installedDate: Yup.date().required('Date is required')
  });

  // id, mType, sLocation, mName, mStatus, installedDate
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      mName: '',
      sLocation: currentStore[0].id,
      mType: false,
      mStatus: true
    },
    validationSchema: NewMeterSchema,

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      console.log(values);
      try {
        await axios.post(`/meters`, values);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Create success', { variant: 'success' });
        navigate(PATH_DASHBOARD.meter.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Meter Name"
                    {...getFieldProps('mName')}
                    error={Boolean(touched.mName && errors.mName)}
                    helperText={touched.mName && errors.mName}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Installed Date"
                    {...getFieldProps('installedDate')}
                    error={Boolean(touched.installedDate && errors.installedDate)}
                    helperText={touched.installedDate && errors.dinstalledDateob}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Store Location</InputLabel>
                    <Select label="Meter" native {...getFieldProps('sLocation')} value={values.sLocation}>
                      {storeList.map((store) => (
                        <option key={store.id} value={store.id}>
                          {store.id}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>

                <FormControlLabel
                  control={<Switch {...getFieldProps('mType')} checked={values.mType} />}
                  label="Type"
                  sx={{ mt: 2 }}
                />
                <FormControlLabel
                  control={<Switch {...getFieldProps('mStatus')} checked={values.mStatus} />}
                  label="Status"
                  sx={{ mt: 2 }}
                />

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Create Meter
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

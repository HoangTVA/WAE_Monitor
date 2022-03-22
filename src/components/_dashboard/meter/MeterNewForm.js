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
import { getMeterList } from '../../../redux/slices/meter';
import { getDtypeList } from '../../../redux/slices/dtype';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function MeterNewForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { meterList } = useSelector((state) => state.meter);
  const { dtypeList } = useSelector((state) => state.dType);

  useEffect(() => {
    dispatch(getMeterList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDtypeList());
  }, [dispatch]);

  const NewMeterSchema = Yup.object().shape({
    dName: Yup.string().required('Name is required'),
    capacity: Yup.number().required('Capacity is required'),
    averageTime: Yup.number().required('Avarage Time is required'),
    dPower: Yup.number().required('Power is required')
  });

  // id, dType, meter, dName, capacity, averageTime, dPower, dStatus
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      dName: '',
      isSample: false,
      dStatus: true
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
                    {...getFieldProps('dName')}
                    error={Boolean(touched.dName && errors.dName)}
                    helperText={touched.dName && errors.dName}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <Input
                    fullWidth
                    type="number"
                    label="Capacity"
                    placeholder="Capacity"
                    {...getFieldProps('capacity')}
                    error={Boolean(touched.capacity && errors.capacity)}
                    helperText={touched.capacity && errors.capacity}
                  />

                  <Input
                    fullWidth
                    type="number"
                    label="Average Time"
                    placeholder="Average Time"
                    {...getFieldProps('averageTime')}
                    error={Boolean(touched.averageTime && errors.averageTime)}
                    helperText={touched.averageTime && errors.averageTime}
                  />

                  <Input
                    fullWidth
                    type="number"
                    label="Power"
                    placeholder="Power"
                    {...getFieldProps('dPower')}
                    error={Boolean(touched.dPower && errors.dPower)}
                    helperText={touched.dPower && errors.dPower}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Devive Type</InputLabel>
                    <Select label="Devive Type" native {...getFieldProps('dType')} value={values.dType}>
                      {dtypeList.map((dType) => (
                        <option key={dType.id} value={dType.id}>
                          {dType.id}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Meter</InputLabel>
                    <Select label="Meter" native {...getFieldProps('meter')} value={values.meter}>
                      {meterList.map((meter) => (
                        <option key={meter.id} value={meter.id}>
                          {meter.id}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>

                <FormControlLabel
                  control={<Switch {...getFieldProps('isSample')} checked={values.isSample} />}
                  label="Sample"
                  sx={{ mt: 2 }}
                />
                <FormControlLabel
                  control={<Switch {...getFieldProps('dStatus')} checked={values.dStatus} />}
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

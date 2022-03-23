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
  Input,
  styled
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
      sLocation: storeList[0].id,
      mType: false,
      mStatus: true
    },
    validationSchema: NewMeterSchema,

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
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

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 -2 15 20"><path fill="${encodeURIComponent(
            '#faed00'
          )}" d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z"/></svg>')`
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
        }
      }
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 -2 15 20"><path fill="${encodeURIComponent(
          '#349eeb'
        )}" d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"/></svg>')`
      }
    }
  }));

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
                    placeholder="yyyy-mm-dd"
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
                          {`${store.id} ${store.sName}`}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>

                <FormControlLabel
                  control={<MaterialUISwitch {...getFieldProps('mType')} checked={values.mType} />}
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

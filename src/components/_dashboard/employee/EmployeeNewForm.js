import { useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import { Box, Grid, Stack, Select, TextField, FormControl } from '@material-ui/core';
// utils
import axios from '../../../utils/axios';
import { getBrandList } from '../../../redux/slices/brand';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

EmployeeNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentEmployee: PropTypes.object
};

export default function EmployeeNewForm({ isEdit, currentEmployee }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { brandList } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrandList());
  }, [dispatch]);

  const NewEmployeeSchema = Yup.object().shape({
    workAt: Yup.number().required('Working brand is required'),
    eName: Yup.string().required('Name is required'),
    ePhone: Yup.number().required('Phone is required'),
    dob: Yup.date().required('Date of birth is required'),
    email: Yup.string().required('Email is required').email()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // workAt: brandList[0].id,
      eName: currentEmployee?.eName || '',
      ePhone: currentEmployee?.ePhone || '',
      dob: currentEmployee?.dob || '',
      email: currentEmployee?.email || ''
    },
    validationSchema: NewEmployeeSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        if (!isEdit) {
          await axios.post(`/employees`, values);
        } else {
          await axios.put(`/employees?id=${currentEmployee?.id}`, values);
        }
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.employee.list);
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
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                <TextField
                  fullWidth
                  label="Employee Name"
                  {...getFieldProps('eName')}
                  error={Boolean(touched.eName && errors.eName)}
                  helperText={touched.eName && errors.eName}
                />
                <TextField
                  fullWidth
                  label="Employee Phone"
                  {...getFieldProps('ePhone')}
                  error={Boolean(touched.ePhone && errors.ePhone)}
                  helperText={touched.ePhone && errors.ePhone}
                />
                <TextField
                  fullWidth
                  label="Employee Date Of Birth"
                  {...getFieldProps('dob')}
                  error={Boolean(touched.dob && errors.dob)}
                  helperText={touched.dob && errors.dob}
                />
              </Stack>
              {!isEdit && (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Employee Email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <FormControl fullWidth>
                    <Select native {...getFieldProps('workAt')} value={values.workAt}>
                      {brandList.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.id}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              )}
            </Stack>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Employee' : 'Save Changes'}
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
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
  Switch,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel
} from '@material-ui/core';
// utils
import axios from 'axios';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import Label from '../../Label';

// ----------------------------------------------------------------------

BrandNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentBrand: PropTypes.object
};

export default function BrandNewForm({ isEdit, currentBrand }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewBrandSchema = Yup.object().shape({
    brandName: Yup.string().required('Name is required'),
    brandEmail: Yup.string().required('Email is required').email(),
    brandPhone: Yup.number().required('Phone number is required'),
    brandAddress: Yup.string().required('Address is required'),
    brandWebsite: Yup.string().required('Website is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      brandName: currentBrand?.brandName || '',
      brandEmail: currentBrand?.brandEmail || '',
      brandPhone: currentBrand?.brandPhone || '',
      brandAddress: currentBrand?.brandAddress || '',
      brandWebsite: currentBrand?.brandWebsite || ''
    },
    validationSchema: NewBrandSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await axios.post(`/brands`);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.brand.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

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
                    label="Brand Name"
                    {...getFieldProps('brandName')}
                    error={Boolean(touched.brandName && errors.brandName)}
                    helperText={touched.brandName && errors.brandName}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    {...getFieldProps('brandEmail')}
                    error={Boolean(touched.brandEmail && errors.brandEmail)}
                    helperText={touched.brandEmail && errors.brandEmail}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...getFieldProps('brandPhone')}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                  <TextField
                    fullWidth
                    label="Brand Main Address"
                    {...getFieldProps('brandAddress')}
                    error={Boolean(touched.brandAddress && errors.brandAddress)}
                    helperText={touched.brandAddress && errors.brandAddress}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Website"
                    {...getFieldProps('brandWebsite')}
                    error={Boolean(touched.brandWebsite && errors.brandWebsite)}
                    helperText={touched.brandWebsite && errors.brandWebsite}
                  />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Create Brand' : 'Save Changes'}
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

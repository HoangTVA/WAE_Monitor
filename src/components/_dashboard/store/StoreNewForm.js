import { useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import { Box, Grid, Stack, Select, TextField, FormControl, InputLabel } from '@material-ui/core';
// utils
import axios from '../../../utils/axios';
import { getBrandList } from '../../../redux/slices/brand';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

StoreNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentStore: PropTypes.object
};

export default function StoreNewForm({ isEdit, currentStore }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { brandList } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrandList());
  }, [dispatch]);

  const NewStoreSchema = Yup.object().shape({
    sName: Yup.string().required('Name is required'),
    sAddress: Yup.string().required('Address is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      sName: currentStore?.sName || '',
      sAddress: currentStore?.sAddress || ''
      // brandId: brandList[0].id
    },
    validationSchema: NewStoreSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        if (!isEdit) {
          await axios.post(`/stores`, values);
        } else {
          await axios.put(`/stores?id=${currentStore?.id}`, values);
        }
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.store.list);
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
                  label="Store Name"
                  {...getFieldProps('sName')}
                  error={Boolean(touched.sName && errors.sName)}
                  helperText={touched.sName && errors.sName}
                />
                <TextField
                  fullWidth
                  label="Store Address"
                  {...getFieldProps('sAddress')}
                  error={Boolean(touched.sAddress && errors.sAddress)}
                  helperText={touched.sAddress && errors.sAddress}
                />
              </Stack>
              {!isEdit && (
                <FormControl fullWidth>
                  <Select native {...getFieldProps('brandId')} value={values.brandId}>
                    {brandList.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {`${brand.id} ${brand.brandName}`}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Stack>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Store' : 'Save Changes'}
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

import { useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import { Box, Grid, Stack, Select, Typography, FormControl } from '@material-ui/core';
// utils
import axios from '../../../utils/axios';
import { getStoreList } from '../../../redux/slices/store';
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

export default function EmployeeNewForm({ currentEmployee }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { storeList } = useSelector((state) => state.store);
  const currentStore = storeList.filter((store) => store.brandId === currentEmployee.workAt);
  console.log(currentStore);

  useEffect(() => {
    dispatch(getStoreList());
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      eId: currentEmployee?.id,
      sId: currentEmployee?.brandId
    },
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await axios.post(`/employees/assign`, values);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Assign success', { variant: 'success' });
        navigate(PATH_DASHBOARD.employee.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { values, handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Stack spacing={3}>
              <Typography variant="subtitle1">
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: 'text.disabled'
                  }}
                  {...getFieldProps('eId')}
                  value={currentEmployee?.id}
                >
                  Chosen Employee:&nbsp;
                </Typography>
                {currentEmployee?.id}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                <FormControl fullWidth>
                  <Select native {...getFieldProps('sId')} value={values.sId}>
                    {currentStore.map((store) => (
                      <option key={store.id} value={store.id}>
                        {store.id}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

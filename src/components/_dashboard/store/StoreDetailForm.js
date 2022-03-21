import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import { Grid, Stack, TextField } from '@material-ui/core';
// routes

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

StoreDetailForm.propTypes = {
  isEdit: PropTypes.bool,
  currentStore: PropTypes.object
};

export default function StoreDetailForm({ currentStore }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      sName: currentStore?.sName,
      sAddress: currentStore?.sAddress,
      brandId: currentStore?.brandId
    }
  });

  const { getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                <TextField fullWidth label="Store Name" {...getFieldProps('sName')} disabled="disabled" />
                <TextField fullWidth label="Store Address" {...getFieldProps('sAddress')} disabled="disabled" />
                <TextField fullWidth label="Brand ID" {...getFieldProps('brandId')} disabled="disabled" />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

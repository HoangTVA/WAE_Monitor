import PropTypes from 'prop-types';

import { Form, FormikProvider, useFormik } from 'formik';
import { Card, Grid, Stack, TextField } from '@material-ui/core';

// ----------------------------------------------------------------------

BrandDetailForm.propTypes = {
  isEdit: PropTypes.bool,
  currentBrand: PropTypes.object
};

export default function BrandDetailForm({ currentBrand }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      brandName: currentBrand?.brandName,
      brandEmail: currentBrand?.brandEmail,
      brandPhone: currentBrand?.brandPhone,
      brandAddress: currentBrand?.brandAddress,
      brandWebsite: currentBrand?.brandWebsite
    }
  });

  const { getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField fullWidth label="Brand Name" {...getFieldProps('brandName')} disabled="disabled" />
                  <TextField fullWidth label="Email Address" {...getFieldProps('brandEmail')} disabled="disabled" />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField fullWidth label="Phone Number" {...getFieldProps('brandPhone')} disabled="disabled" />
                  <TextField
                    fullWidth
                    label="Brand Main Address"
                    {...getFieldProps('brandAddress')}
                    disabled="disabled"
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField fullWidth label="Website" {...getFieldProps('brandWebsite')} disabled="disabled" />
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

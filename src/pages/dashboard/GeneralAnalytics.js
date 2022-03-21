// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  AnalyticsWater,
  AnalyticsIssues,
  AnalyticsEmployee,
  AnalyticsElectric,
  AnalyticsCurrentVisits,
  AnalyticsWebsiteVisits
} from '../../components/_dashboard/general-analytics';

// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  const { themeStretch } = useSettings();

  return (
    <Page title="General: Analytics | WAEM">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsElectric />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWater />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsEmployee />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsIssues />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentVisits />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

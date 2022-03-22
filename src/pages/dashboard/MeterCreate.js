// material
import { Container } from '@material-ui/core';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import MeterNewForm from '../../components/_dashboard/meter/MeterNewForm';

// ----------------------------------------------------------------------

export default function BrandCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Meter: Create a new meter | WAEM">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new meter"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Meter', href: PATH_DASHBOARD.meter.list },
            { name: 'New Meter' }
          ]}
        />
        <MeterNewForm />
      </Container>
    </Page>
  );
}

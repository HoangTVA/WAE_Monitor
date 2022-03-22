// material
import { Container } from '@material-ui/core';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import DeviceNewForm from '../../components/_dashboard/device/DeviceNewForm';

// ----------------------------------------------------------------------

export default function BrandCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Device: Create a new device | WAEM">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new device"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Device', href: PATH_DASHBOARD.device.list },
            { name: 'New device' }
          ]}
        />
        <DeviceNewForm />
      </Container>
    </Page>
  );
}

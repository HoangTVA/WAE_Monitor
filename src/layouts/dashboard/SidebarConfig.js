// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  measure: getIcon('ic_calendar'),
  store: getIcon('ic_cart'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  account: getIcon('ic_account'),
  brand: getIcon('ic_ecommerce'),
  device: getIcon('ic_clock'),
  meter: getIcon('ic_meter')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [{ title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics }]
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'Measurement',
        path: PATH_DASHBOARD.measurement.root,
        icon: ICONS.measure,
        children: [
          { title: 'table', path: PATH_DASHBOARD.measurement.table }
          // { title: 'list', path: PATH_DASHBOARD.measurement.list }
        ]
      },
      {
        title: 'Device',
        path: PATH_DASHBOARD.device.root,
        icon: ICONS.device,
        children: [{ title: 'list', path: PATH_DASHBOARD.device.list }]
      },
      {
        title: 'Meter',
        path: PATH_DASHBOARD.meter.root,
        icon: ICONS.meter,
        children: [{ title: 'list', path: PATH_DASHBOARD.meter.list }]
      },
      {
        title: 'Store',
        path: PATH_DASHBOARD.store.root,
        icon: ICONS.store,
        children: [{ title: 'list', path: PATH_DASHBOARD.store.list }]
      },
      {
        title: 'Brand',
        path: PATH_DASHBOARD.brand.root,
        icon: ICONS.brand,
        children: [{ title: 'list', path: PATH_DASHBOARD.brand.list }]
      },
      {
        title: 'Employee',
        path: PATH_DASHBOARD.employee.root,
        icon: ICONS.user,
        children: [{ title: 'list', path: PATH_DASHBOARD.employee.list }]
      }
    ]
  }
];

export default sidebarConfig;

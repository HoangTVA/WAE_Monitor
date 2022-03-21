// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  calendar: getIcon('ic_calendar'),
  store: getIcon('ic_cart'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  account: getIcon('ic_account'),
  brand: getIcon('ic_ecommerce')
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
      // MANAGEMENT : USER
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
      },
      {
        title: 'Measurement',
        path: PATH_DASHBOARD.measurement.root,
        icon: ICONS.calendar,
        children: [{ title: 'list', path: PATH_DASHBOARD.measurement.list }]
      }
    ]
  }
];

export default sidebarConfig;

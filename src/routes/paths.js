// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    analytics: path(ROOTS_DASHBOARD, '/analytics')
  },
  employee: {
    root: path(ROOTS_DASHBOARD, '/employee'),
    list: path(ROOTS_DASHBOARD, '/employee/list'),
    newEmployee: path(ROOTS_DASHBOARD, '/employee/new'),
    editById: path(ROOTS_DASHBOARD, '/employee/:employeeId/edit')
  },
  brand: {
    root: path(ROOTS_DASHBOARD, '/brand'),
    list: path(ROOTS_DASHBOARD, '/brand/list'),
    newBrand: path(ROOTS_DASHBOARD, '/brand/new'),
    editById: path(ROOTS_DASHBOARD, '/brand/:brandId/edit'),
    detail: path(ROOTS_DASHBOARD, '/brand/:brandId/detail')
  },
  store: {
    root: path(ROOTS_DASHBOARD, '/store'),
    list: path(ROOTS_DASHBOARD, '/store/list'),
    newStore: path(ROOTS_DASHBOARD, '/store/new'),
    editById: path(ROOTS_DASHBOARD, '/store/:storeId/edit'),
    detail: path(ROOTS_DASHBOARD, '/store/:storeId/detail')
  },
  measurement: {
    root: path(ROOTS_DASHBOARD, '/measurement'),
    table: path(ROOTS_DASHBOARD, '/measurement/table'),
    list: path(ROOTS_DASHBOARD, '/measurement/list')
    // measurementById: path(ROOTS_DASHBOARD, '/measurement/:id')
  },
  device: {
    root: path(ROOTS_DASHBOARD, '/device'),
    list: path(ROOTS_DASHBOARD, '/device/list'),
    newDevice: path(ROOTS_DASHBOARD, '/device/new')
    // editById: path(ROOTS_DASHBOARD, '/device/:deviceId/edit')
    // detail: path(ROOTS_DASHBOARD, '/device/:deviceId/detail')
  },
  meter: {
    root: path(ROOTS_DASHBOARD, '/meter'),
    list: path(ROOTS_DASHBOARD, '/meter/list'),
    newMeter: path(ROOTS_DASHBOARD, '/meter/new')
    // editById: path(ROOTS_DASHBOARD, '/device/:deviceId/edit')
    // detail: path(ROOTS_DASHBOARD, '/device/:deviceId/detail')
  }
};

export const PATH_DOCS = '';

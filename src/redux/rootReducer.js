import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import blogReducer from './slices/blog';
import userReducer from './slices/user';
import brandReducer from './slices/brand';
import storeReducer from './slices/store';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import employeeReducer from './slices/employee';
import measurementReducer from './slices/measurement';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const measurementPersistConfig = {
  key: 'measurement',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy']
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  blog: blogReducer,
  user: userReducer,
  brand: brandReducer,
  store: storeReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  employee: employeeReducer,
  measurement: persistReducer(measurementPersistConfig, measurementReducer),
  product: persistReducer(productPersistConfig, productReducer)
});

export { rootPersistConfig, rootReducer };

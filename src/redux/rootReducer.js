import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import brandReducer from './slices/brand';
import storeReducer from './slices/store';
import employeeReducer from './slices/employee';
import measurementReducer from './slices/measurement';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  brand: brandReducer,
  store: storeReducer,
  employee: employeeReducer,
  measurement: measurementReducer
});

export { rootPersistConfig, rootReducer };

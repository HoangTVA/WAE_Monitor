import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import brandReducer from './slices/brand';
import storeReducer from './slices/store';
import employeeReducer from './slices/employee';
import measurementReducer from './slices/measurement';
import deviceReducer from './slices/device';
import dtypeReducer from './slices/dtype';
import meterReducer from './slices/meter';

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
  measurement: measurementReducer,
  device: deviceReducer,
  dType: dtypeReducer,
  meter: meterReducer
});

export { rootPersistConfig, rootReducer };

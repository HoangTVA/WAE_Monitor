import { filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  deviceList: []
};

const slice = createSlice({
  name: 'deviceList',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET LIST
    getDeviceListSuccess(state, action) {
      state.isLoading = false;
      state.deviceList = action.payload;
    }
  }
});

// Generate device
const newDeviceList = (res) => {
  console.log(res);
  const deviceList = res.data.map((data) => {
    const device = {
      deviceId: data.id,
      deviceName: data.dName
    };
    console.log(device);
    return device;
  });
};

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getDeviceList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/devices');
      axios.get('/devices').then((res) => console.log(res));
      newDeviceList(response);
      dispatch(slice.actions.getDeviceListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

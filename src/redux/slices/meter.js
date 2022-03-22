import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  meterList: []
};

const slice = createSlice({
  name: 'meterList',
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
    getMeterListSuccess(state, action) {
      state.isLoading = false;
      state.meterList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
const newMeterList = (res) => {
  console.log(res);
  const meterList = res.data.map((data) => {
    const meter = {
      meterId: data.id,
      meterName: data.mName
    };
    console.log(meter);
    return meter;
  });
};

// ----------------------------------------------------------------------

export function getMeterList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/meters/all');
      axios.get('/meters/all').then((res) => console.log(res));
      newMeterList(response);
      dispatch(slice.actions.getMeterListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

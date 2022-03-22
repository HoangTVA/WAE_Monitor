import { filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  dtypeList: []
};

const slice = createSlice({
  name: 'dtypeList',
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

    getDtypeListSuccess(state, action) {
      state.isLoading = false;
      state.dtypeList = action.payload;
    }
  }
});

// Generate
const newDtypeList = (res) => {
  console.log(res);
  const dtypeList = res.data.map((data) => {
    const dtype = {
      dtype: data.id,
      dtypeName: data.dTypeName
    };
    console.log(dtype);
    return dtype;
  });
};

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getDtypeList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/device-types');
      axios.get('/device-types').then((res) => console.log(res));
      newDtypeList(response);
      dispatch(slice.actions.getDtypeListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

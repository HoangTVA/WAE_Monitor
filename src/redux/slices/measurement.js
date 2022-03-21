import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  measurementList: [],
  measure: null,
  sortBy: null
};

const slice = createSlice({
  name: 'measurement',
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

    // GET Measure List
    getMeasurementListSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    // GET Measure
    getMeasurementSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    //  SORT Measure
    sortByMeasurements(state, action) {
      state.sortBy = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { sortByMeasurements } = slice.actions;

// ----------------------------------------------------------------------

export function getMeasurementList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/measurements');
      axios.get('/measurements').then((res) => console.log(res));
      dispatch(slice.actions.getMeasurementListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

// export function getMeasurement(id) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/measurements/measurement?id=$', {
//         params: { id }
//       });
//       dispatch(slice.actions.getMeasurementSuccess(response.data.product));
//     } catch (error) {
//       console.error(error);
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

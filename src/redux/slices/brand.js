import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  brand: []
};

const slice = createSlice({
  name: 'brand',
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

    // DELETE BRAND
    deleteBrand(state, action) {
      const deleteBrand = filter(state.brandList, (brand) => brand.id !== action.payload);
      state.brandList = deleteBrand;
    },

    // GET BRAND LIST
    getBrandListSuccess(state, action) {
      state.isLoading = false;
      state.brandList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { deleteBrand } = slice.actions;

// ----------------------------------------------------------------------

export function getBrandList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/brands');
      dispatch(slice.actions.getBrandListSuccess(response.data.brand));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

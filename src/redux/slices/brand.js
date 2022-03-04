import { filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  brandList: []
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

// Generate brand
const newBrandList = (res) => {
  console.log(res);
  const brandList = res.data.map((data) => {
    const brand = {
      brandId: data.id,
      brandName: data.brandName,
      brandPhone: data.brandPhone,
      brandEmail: data.brandEmail,
      brandWebsite: data.brandWebsite,
      brandAddress: data.brandAddress
    };
    console.log(brand);
    return brand;
  });
};

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
      newBrandList(response);
      dispatch(slice.actions.getBrandListSuccess(response.data.brandList));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

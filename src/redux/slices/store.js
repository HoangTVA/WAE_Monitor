import { filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  storeList: []
};

const slice = createSlice({
  name: 'storeList',
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

    // DELETE STORE
    deleteStore(state, action) {
      const deleteStore = filter(state.storeList, (store) => store.id !== action.payload);
      state.storeList = deleteStore;
    },

    // GET STORE LIST
    getStoreListSuccess(state, action) {
      state.isLoading = false;
      state.storeList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { deleteStore } = slice.actions;

// ----------------------------------------------------------------------
const newStoreList = (res) => {
  console.log(res);
  const storeList = res.data.map((data) => {
    const store = {
      id: data.id,
      brandId: data.brandId,
      storeName: data.sName,
      storeAddress: data.sAddress
    };
    console.log(store);
    return store;
  });
};

// ----------------------------------------------------------------------

export function getStoreList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/stores');
      axios.get('/stores').then((res) => console.log(res));
      newStoreList(response);
      dispatch(slice.actions.getStoreListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

import { filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  employeeList: []
};

const slice = createSlice({
  name: 'employeeList',
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

    // GET EMPLOYEE LIST
    getEmployeeListSuccess(state, action) {
      state.isLoading = false;
      state.employeeList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------
const newEmployeeList = (res) => {
  console.log(res);
  const employeeList = res.data.map((data) => {
    const employee = {
      employeeId: data.id,
      workAt: data.workAt,
      eName: data.eName,
      ePhone: data.ePhone,
      dob: data.dob,
      createdDate: data.createdDate,
      email: data.email
    };
    console.log(employee);
    return employee;
  });
};

// ----------------------------------------------------------------------

export function getEmployeeList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/employees/brand');
      axios.get('/employees/brand').then((res) => console.log(res));
      newEmployeeList(response);
      dispatch(slice.actions.getEmployeeListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

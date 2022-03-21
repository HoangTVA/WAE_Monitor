import axios from 'axios';

// ----------------------------------------------------------------------
axios.defaults.baseURL = 'https://waemonitor.azurewebsites.net/api/v1.5';

const token = localStorage.getItem('accessToken');

axios.defaults.headers = {
  // eslint-disable-next-line prettier/prettier
  Authorization: `Bearer ${token}`,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
};

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

import axios from 'axios';

// ----------------------------------------------------------------------
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'https://waemonitor.azurewebsites.net';

const axiosInstance = axios.create();

// axios.defaults.headers = {
//   Authorization: token,
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//   'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
// };

// const responseBody = (response) => response.data;
// const requests = {
//   get: (url) => axios.get(url).then(responseBody),
//   post: (url, body) => axios.post(url, body).then(responseBody),
//   put: (url, body) => axios.put(url, body).then(responseBody),
//   del: (url, params) => axios.delete(url, { params }).then(responseBody)
// };

// const activities = {
//   list: (target) => requests.get(`/${target}`),
//   create: (target, body) => requests.post(`/${target}`, body),
//   update: (target, body) => requests.put(`/${target}`, body),
//   delete: (target, data) => requests.del(`/${target}`, data)
// };

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

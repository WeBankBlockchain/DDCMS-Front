import axios from "axios";

export const baseURL = "http://116.205.167.248:10880/api/";

const axiosOption = {
  baseURL: baseURL,
  // baseURL: 'http://127.0.0.1:10880/api/',
  timeout: 5000,
};

const instance = axios.create(axiosOption);

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
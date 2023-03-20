import axios from 'axios';
import { message } from "antd";

export const baseURL = 'http://116.205.167.248:10880/api/';
// export const baseURL = 'http://localhost:10880/api/'

const axiosOption = {
	baseURL: baseURL,
	// baseURL: 'http://127.0.0.1:10880/api/',
	timeout: 5000
};

const instance = axios.create(axiosOption);

instance.interceptors.request.use(
  (config) => {
    // 获取 JWT 令牌
    const token = localStorage.getItem("token");
    // 如果存在令牌，则在请求头中添加 Authorization 字段
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
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
    // 处理 HTTP 错误
    if (error.response) {
      message.error(
        `请求失败: ${error.response.status} ${error.response.statusText}`
      );
    } else {
      message.error(error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;

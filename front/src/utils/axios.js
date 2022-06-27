import { create } from 'axios';
import { ElMessage } from 'element-plus';

const service = create({
  baseURL: '/api',
  timeout: 5000,
});

service.interceptors.request.use((config) => {
  return config;
});

service.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data.code !== 0) {
      // 规定状态码为0则是正常请求
      ElMessage({
        type: 'error',
        message: 'Response Status Code Error!',
      });
      return Promise.reject(data.message || 'Error');
    }
    return response;
  },
  (err) => {
    console.log(err);
    ElMessage({
      type: 'error',
      message: err,
    });
  }
);

export default service;

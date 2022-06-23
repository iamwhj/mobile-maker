import { create } from 'axios';

const service = create({
  baseURL: '/api',
  timeout: 5000,
});

service.interceptors.request.use((config) => {
  return config;
});

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    console.log(err);
  }
);

export default service;

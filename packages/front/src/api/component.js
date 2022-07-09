import axios from '@/utils/axios';

const baseURl = '/component';

export const saveComponent = (params) => {
  return axios.post(baseURl, params);
};

export const getComponentList = (params) => {
  return axios.get(baseURl, { params });
};

export const deleteComponent = (params) => {
  return axios.delete(baseURl + '/delete', { params });
};

export const updateComponent = (params) => {
  return axios.post(baseURl + '/update', params);
};

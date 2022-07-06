import axios from '@/utils/axios';

const baseURl = '/activity';

export const saveActivity = (params) => {
  return axios.post(baseURl, params);
};

export const getActivityList = (params) => {
  return axios.get(baseURl, { params });
};

export const deleteActivity = (params) => {
  return axios.delete(baseURl + '/delete', { params });
};

export const updateActivity = (params) => {
  return axios.post(baseURl + '/update', params);
};

export const publishActivity = (params) => {
  return axios.get(baseURl + '/publish', { params });
};

import axios from '@/utils/axios';

const baseURl = '/activity';

export const saveActivity = (params) => {
  return axios.post(baseURl, params);
};

export const getActivityList = (params) => {
  return axios.get(baseURl, params);
};

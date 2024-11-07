import axios from '@/utils/axios'

const baseURl = '/category'

export const saveCategory = (params) => {
  return axios.post(baseURl, params)
}

export const getCategoryList = (params) => {
  return axios.get(baseURl, { params })
}

export const deleteCategory = (params) => {
  return axios.delete(baseURl + '/delete', { params })
}

export const updateCategory = (params) => {
  return axios.post(baseURl + '/update', params)
}

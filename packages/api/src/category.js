import { request } from '@mk/utils'

const baseURl = '/category'

export const saveCategory = (params) => {
  return request.post(baseURl, params)
}

export const getCategoryList = (params) => {
  return request.get(baseURl, { params })
}

export const deleteCategory = (params) => {
  return request.delete(baseURl + '/delete', { params })
}

export const updateCategory = (params) => {
  return request.post(baseURl + '/update', params)
}

import { request } from '@mk/utils'

const baseURl = '/application'

export const saveApplication = (params) => {
  return request.post(baseURl, params)
}

export const getApplicationList = (params) => {
  return request.get(baseURl, { params })
}

export const getApplicationById = (params) => {
  return request.get(baseURl + '/' + params.id)
}

export const deleteApplication = (params) => {
  return request.delete(baseURl + '/delete', { params })
}

export const updateApplication = (params) => {
  return request.post(baseURl + '/update', params)
}

export const publishApplication = (params) => {
  return request.get(baseURl + '/publish', { params })
}

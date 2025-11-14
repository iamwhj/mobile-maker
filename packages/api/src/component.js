import { request } from '@mk/utils'

const baseURl = '/component'

export const saveComponent = (params) => {
  return request.post(baseURl, params)
}

export const getComponentList = (params) => {
  return request.get(baseURl, { params })
}

export const deleteComponent = (params) => {
  return request.delete(baseURl + '/delete', { params })
}

export const updateComponent = (params) => {
  return request.post(baseURl + '/update', params)
}

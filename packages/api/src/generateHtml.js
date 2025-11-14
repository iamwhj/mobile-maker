import { request } from '@mk/utils'

const baseURl = '/generateHtml'

export const saveHtml = (params) => {
  return request.post(baseURl, params)
}

export const getHtml = (params) => {
  return request.get(baseURl, { params })
}

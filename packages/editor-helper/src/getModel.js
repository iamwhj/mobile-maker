import { deepClone } from '@mk/utils'

// Page Model
export const getApplicationModel = () => {
  return {
    components: [],
    detail: {
      name: '应用名称',
      title: '页面标题',
      date: [],
    },
    mark: 'application-' + Date.now(),
  }
}

// Component Model
export const getComponentModel = ({ name, fullName }) => {
  return {
    name,
    fullName,
    mark: name + '-' + Date.now(),
    detail: {},
    style: {},
  }
}

// History Model
export const getHistoryModel = ({ type, name }, page) => {
  return {
    type,
    name,
    data: deepClone(page),
  }
}

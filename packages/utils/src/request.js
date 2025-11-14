import axios from 'axios'
import { ElMessage } from 'element-plus'

// 判断是否前端环境
const isWebEnv = () => {
  if (typeof window !== 'undefined') return true
  return false
}

const resolveBaseURL = () => {
  if (isWebEnv() && import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  } else if (typeof process !== 'undefined' && process.env.VITE_API_URL) {
    return process.env.VITE_API_URL
  }
  return 'http://127.0.0.1:3000'
}

export const request = axios.create({
  baseURL: resolveBaseURL(),
  timeout: 5000,
})

request.interceptors.request.use((config) => {
  return config
})

request.interceptors.response.use(
  (response) => {
    const data = response.data
    if (data.code !== 0) {
      // 规定状态码为0则是正常请求
      isWebEnv() &&
        ElMessage({
          type: 'error',
          message: '请求失败：' + (data.message || 'Error'),
        })
      return Promise.reject(data.message || 'Error')
    }
    return response
  },
  (err) => {
    isWebEnv() &&
      ElMessage({
        type: 'error',
        message: err,
      })
    console.error(`axios请求失败，baseURL：${resolveBaseURL()}`)
    throw new Error(err)
  }
)

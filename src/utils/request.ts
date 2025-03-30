import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults
} from "axios"
import router from "@/router"
import { ElMessage } from "element-plus"

// 定义响应数据的类型
export interface ApiResponse<T = unknown> {
  code: number
  msg: string
  data?: T
}

const defaultConfig: AxiosRequestConfig = {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout: 5000 // 默认值是 `0` (永不超时)
}

const httpInstance = axios.create(
  defaultConfig as CreateAxiosDefaults
) as AxiosInstance

httpInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

httpInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    // 直接返回数据，让API层处理业务状态码
    return res
  },
  (error: AxiosError) => {
    // 处理HTTP错误（非业务错误）
    if (error.response) {
      const status = error.response.status

      // 处理401未授权错误
      if (status === 401) {
        localStorage.removeItem("token")
        router.push("/login")
        ElMessage.error("登录已过期，请重新登录")
      } else if (status === 403) {
        ElMessage.error("没有权限访问")
      } else if (status === 404) {
        ElMessage.error("请求的资源不存在")
      } else if (status === 500) {
        ElMessage.error("服务器错误，请稍后再试")
      } else {
        ElMessage.error(`请求失败(${status})`)
      }
    } else if (error.message.includes("timeout")) {
      ElMessage.error("请求超时，请检查网络连接")
    } else {
      ElMessage.error("网络错误，请检查您的网络连接")
    }

    return Promise.reject(error)
  }
)

export { httpInstance }

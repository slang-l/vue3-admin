import { httpInstance, type ApiResponse } from "@/utils/request"
import { ElMessage } from "element-plus"

// 定义接口参数类型
interface LoginData {
  username: string
  password: string
  verCode: string
  uuid: string
}

/**
 * 用户登录
 */
export const login = async (data: LoginData): Promise<string | null> => {
  try {
    const res = await httpInstance.post("/login", data)
    // 处理业务状态码
    if (res.code === 200) {
      // 存储token
      if (res.data) {
        localStorage.setItem("token", res.data)
      }
      return res.data
    } else {
      ElMessage.error(res.msg || "登录失败")
      return null
    }
  } catch {
    // HTTP错误已在拦截器中处理，这里不需要重复处理
    return null
  }
}

/**
 * 获取验证码
 */
export const getCaptcha = async (): Promise<{
  image: string
  key: string
} | null> => {
  try {
    const res =
      await httpInstance.get<ApiResponse<{ image: string; key: string }>>(
        "/captcha"
      )
    if (res.code === 200) {
      return res.data
    } else {
      ElMessage.error(res.msg || "获取验证码失败")
      return null
    }
  } catch {
    return null
  }
}

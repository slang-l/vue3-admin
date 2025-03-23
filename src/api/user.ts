import axios from "axios"
import router from "../router"

interface LoginData {
  username: string | number
  password: string | number
  verCode: string | number
  // uuid: string | number
}

export const login = async (data: LoginData) => {
  try {
    const res = await axios.post("/login", data)
    localStorage.setItem("accessToken", res.data)
    // localStorage.setItem("refreshToken", res.data.data.refreshToken)
    const accessToken = localStorage.getItem("accessToken")
    axios.defaults.headers.common["Authorization"] = accessToken
    router.push("/")
    return res
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401)
      router.push("/login")
    throw error
  }
}

export const getCaptcha = async () => {
  try {
    const res = await axios.get("/captcha")
    return res.data.data.image
  } catch (error: Error | unknown) {
    console.error("获取验证码失败:", error)
    throw error
  }
}

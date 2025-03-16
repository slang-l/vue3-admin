import axios from "axios"
import router from "../router"

interface LoginData {
  username: string | number
  password: string | number
}

export const login = async (data: LoginData) => {
  try {
    const res = await axios.post("/api/login", data)
    localStorage.setItem("accessToken", res.data.data.accessToken)
    localStorage.setItem("refreshToken", res.data.data.refreshToken)
    const accessToken = localStorage.getItem("accessToken")
    axios.defaults.headers.common["Authorization"] = accessToken
    router.push("/")
    return res.data.data
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401)
      router.push("/login")
    throw error
  }
}

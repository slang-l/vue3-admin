import axios from "axios"
import router from "@/router"
import { jwtDecode } from "jwt-decode"

const baseURL = import.meta.env.VITE_BASE_URL as string

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true"
  }
})

function isJwtExpired(token: string) {
  const decoded = jwtDecode(token)
  return decoded.exp && decoded.exp < Date.now() / 1000
}

async function verifyToken() {
  const accessToken = localStorage.getItem("accessToken")
  if (!accessToken) {
    throw new Error("No access token found")
  }

  return !isJwtExpired(accessToken)
}

async function refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken")
  if (!refreshToken) {
    throw new Error("No refresh token found")
  }

  if (isJwtExpired(refreshToken)) {
    router.push("/login")
    return
  }

  const res = await axios.post("/api/refresh-token", {
    refreshToken
  })

  if (res.status !== 200) {
    throw new Error("Refresh request failed")
  }

  const newAccessToken = res.data.data.accessToken
  const newRefreshToken = res.data.data.refreshToken

  if (!newAccessToken || !newRefreshToken) {
    throw new Error("Invalid token response")
  }

  localStorage.setItem("accessToken", newAccessToken)
  localStorage.setItem("refreshToken", newRefreshToken)
}

api.interceptors.request.use(
  async (config) => {
    try {
      const valid = await verifyToken()
      if (!valid) {
        await refreshToken()
      }
    } catch (e) {
      console.error(e)
      router.push("/login")
      return Promise.reject(e)
    }

    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      console.log("token", accessToken)
      config.headers.Authorization = accessToken
    } else {
      router.push("/login")
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api

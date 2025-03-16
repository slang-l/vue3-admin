import { ElMessage } from "element-plus"
import api from "./api"

export const logout = async () => {
  try {
    ElMessage.info("正在登出")
    await api.post("/api/logout")
    ElMessage.success("登出成功")
  } catch (error: Error | unknown) {
    ElMessage.error("登出错误")
    throw error
  }
}

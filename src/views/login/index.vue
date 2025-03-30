<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-bold text-center mb-6">登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700"
            >用户名</label
          >
          <input
            type="text"
            id="username"
            v-model="username"
            required
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >密码</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >验证码</label
          >
          <div class="flex items-center justify-center">
            <input
              type="text"
              id="verCode"
              v-model="verCode"
              required
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            <img
              :src="captchaUrl"
              class="w-16 h-16"
              @click="handleChangeCaptcha"
            />
          </div>
        </div>
        <div class="mb-4 flex items-center justify-center">
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-200 transform hover:scale-105"
          >
            登录
          </button>
        </div>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
        还没有账户？
        <a href="/register" class="text-blue-600 hover:underline">注册</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { login, getCaptcha } from "@/api/user"
import { ElMessage } from "element-plus"

// 响应式状态
const loading = ref(false)
const router = useRouter()
const route = useRoute()
const username = ref("")
const password = ref("")
const verCode = ref("")
const captchaUrl = ref("")
const captchaUuid = ref("")

// 登录方法
const handleLogin = async () => {
  if (!username.value || !password.value || !verCode.value) {
    ElMessage.warning("请填写完整的登录信息")
    return
  }
  try {
    loading.value = true
    const result = await login({
      username: username.value,
      password: password.value,
      // username: 'admin',
      // password: '123456',
      // verCode: 'najx7',
      // uuid:'ae2b3fb3-2bfd-4508-82d3-6ceb39dfc688',
      verCode: verCode.value,
      uuid: captchaUuid.value
    })
    if (result) {
      // 登录成功，API层已经存储了token
      ElMessage.success("登录成功")
      localStorage.setItem("username", username.value)
      // 检查是否有重定向路径
      const redirectPath = route.query.redirect || ""
      router.push(redirectPath || "/")
    } else {
      // 登录失败，刷新验证码
      handleChangeCaptcha()
    }
  } catch (error) {
    ElMessage.error(error || "出错了")
  } finally {
    loading.value = false
  }
}

const handleChangeCaptcha = async () => {
  try {
    const res = await getCaptcha()
    captchaUrl.value = res.image
    captchaUuid.value = res.key
  } catch (error) {
    console.error("获取验证码失败", error)
  }
}

onMounted(() => {
  handleChangeCaptcha()
})
</script>

<style scoped>
/* 可以在这里添加自定义样式 */
</style>

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

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    handleLogin() {
      // 登录逻辑
      console.log("用户名:", this.username)
      console.log("密码:", this.password)
      // 这里可以添加调用API的代码
    }
  }
}
</script>

<style scoped>
/* 可以在这里添加自定义样式 */
</style>

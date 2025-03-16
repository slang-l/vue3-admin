import { createApp } from "vue"
import App from "./App.vue"

import router from "./router"

import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

import "uno.css"
import "normalize.css/normalize.css"
import "@/styles/index.scss"

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
pinia.use(piniaPluginPersistedstate) // 安装持久化保存
app.use(ElementPlus)
app.mount("#app")

import { createApp } from "vue"
import App from "./App.vue"

import router from "./router"

import { createPinia } from "pinia"

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

import "uno.css"
import "normalize.css/normalize.css"

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount("#app")

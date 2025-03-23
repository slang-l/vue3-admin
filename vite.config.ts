import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import UnoCss from "unocss/vite"

import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src")
      }
    ]
  },
  plugins: [
    vue(),
    UnoCss(),
    AutoImport({
      // api
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      // 解析组件
      resolvers: [ElementPlusResolver()],
      // 所有组件都可以自动加载
      dirs: ["src/components", "src/layout/components"]
    })
  ],
  server:{
    host: '0.0.0.0',
    open:true,
    cors: true,
    proxy: {
      '/login': {
        target: 'http://121.36.218.185:8080',
        changeOrigin: true,
      },
      '/captcha': {
        target: 'http://121.36.218.185:8080',
        changeOrigin: true,
      },
      '/sys/menu/nav': {
        target: 'http://121.36.218.185:8080',
        changeOrigin: true,
      },
    }
  }
})

import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

import Layout from "@/layout/index.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "dashboard",
        name: "Ddashboard",
        component: () => import("@/views/dashboard/index.vue")
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(), // 路由模式
  routes // 路由表
})

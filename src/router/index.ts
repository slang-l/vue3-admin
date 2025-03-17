import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

import Layout from "@/layout/index.vue"

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      hidden: true
    }
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          icon: "ant-design:bank-outlined",
          title: "首页"
        }
      }
    ]
  }
]

const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/documentation",
    redirect: "/documentation/index",
    component: Layout,
    children: [
      {
        path: "index",
        name: "documentation",
        component: () => import("@/views/documentation/index.vue"),
        meta: {
          icon: "ant-design:database-outlined",
          title: "文档"
        }
      }
    ]
  },
  {
    path: "/guide",
    redirect: "/guide/index",
    component: Layout,
    children: [
      {
        path: "index",
        name: "guide",
        component: () => import("@/views/guide/index.vue"),
        meta: {
          icon: "ant-design:car-twotone",
          title: "指南"
        }
      }
    ]
  },
  {
    path: "/system",
    redirect: "/system/menu",
    component: Layout,
    meta: {
      icon: "ant-design:unlock-filled",
      title: "系统管理",
      alwaysShow: true
      // 作为父文件夹一直显示
    },
    children: [
      {
        path: "menu",
        name: "menu",
        component: () => import("@/views/system/menu.vue"),
        meta: {
          icon: "ant-design:menu-outlined",
          title: "菜单管理"
        }
      },
      {
        path: "role",
        name: "role",
        component: () => import("@/views/system/role.vue"),
        meta: {
          icon: "ant-design:team-outlined",
          title: "角色管理"
        }
      },
      {
        path: "user",
        name: "user",
        component: () => import("@/views/system/user.vue"),
        meta: {
          icon: "ant-design:user-outlined",
          title: "用户管理"
        }
      }
    ]
  },
  {
    path: "/external-link",
    components: Layout,
    children: [
      {
        path: "https://www.baidu.com",
        name: "external-link",
        redirect: "/",
        meta: {
          icon: "ant-design:global-outlined",
          title: "外部链接"
        }
      }
    ]
  }
]

export const routes = [...constantRoutes, ...asyncRoutes]

export default createRouter({
  history: createWebHistory(), // 路由模式
  routes // 路由表
})

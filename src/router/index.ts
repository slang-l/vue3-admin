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

const router = createRouter({
  history: createWebHistory(), // 路由模式
  routes // 路由表
})

// 定义不需要登录就可以访问的白名单路由
const whiteList = ["/login"]

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 检查用户是否已登录（这里使用localStorage中是否有token作为判断依据）
  const hasToken = localStorage.getItem("token")

  if (hasToken) {
    // 已登录状态
    if (to.path === "/login") {
      // 如果已登录，访问登录页则重定向到首页
      next({ path: "/" })
    } else {
      // 正常访问其他页面
      next()
    }
  } else {
    // 未登录状态
    if (whiteList.includes(to.path)) {
      // 如果访问的是白名单页面，直接放行
      next()
    } else {
      // 如果访问的不是白名单页面，重定向到登录页
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router

import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

import Layout from "@/layout/index.vue"

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
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
          title: "首页",
          requiresAuth: true
        }
      }
    ]
  }
]

const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/documentation",
    redirect: "/documentation/index",
    components: Layout,
    children: [
      {
        path: "index",
        name: "documentation",
        component: () => import("@/views/documentation/index.vue"),
        meta: {
          icon: "ant-design:database-outlined",
          title: "文档",
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/guide",
    redirect: "/guide/index",
    components: Layout,
    children: [
      {
        path: "index",
        name: "guide",
        component: () => import("@/views/guide/index.vue"),
        meta: {
          icon: "ant-design:car-twotone",
          title: "指南",
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/system",
    redirect: "/system/menu",
    components: Layout,
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
          title: "菜单管理",
          requiresAuth: true
        }
      },
      {
        path: "role",
        name: "role",
        component: () => import("@/views/system/role.vue"),
        meta: {
          icon: "ant-design:team-outlined",
          title: "角色管理",
          requiresAuth: true
        }
      },
      {
        path: "user",
        name: "user",
        component: () => import("@/views/system/user.vue"),
        meta: {
          icon: "ant-design:user-outlined",
          title: "用户管理",
          requiresAuth: true
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
          title: "外部链接",
          requiresAuth: true
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

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  // 检查用户是否需要登录
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  // 检查用户是否已登录
  const isAuthenticated = !!localStorage.getItem("token")

  if (requiresAuth && !isAuthenticated) {
    // 需要认证但未登录，重定向到登录页
    next({
      path: "/login",
      // 保存原始请求路径，以便登录后重定向回去
      query: { redirect: to.fullPath }
    })
  } else if (to.path === "/login" && isAuthenticated) {
    // 已登录用户访问登录页，重定向到首页
    next({ path: "/" })
  } else {
    // 其他情况正常访问
    next()
  }
})
export default router

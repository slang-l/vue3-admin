import "vue-router"

// 给模块添加额外类型
declare module "vue-router" {
  interface RouteMeta {
    title?: string
    icon?: string
    hidden?: boolean
    alwaysShow?: boolean
  }
}

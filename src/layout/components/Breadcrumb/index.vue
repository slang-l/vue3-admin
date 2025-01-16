<template>
  <ElBreadcrumb separator="/" leading-50px text-lg ml-30px inline-block>
    <template v-for="(item, index) in list" :key="item.path">
      <ElBreadcrumbItem :to="{ path: item.path }">
        <span v-if="list.length - 1 === index">{{ item.meta?.title }}</span>
        <a v-else @click="handleLink(route)">{{ item.meta?.title }}</a>
      </ElBreadcrumbItem>
    </template>
  </ElBreadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { useRoute, type RouteLocationMatched } from "vue-router"
import { compile } from "path-to-regexp"
import router from "@/router"

type PartialRouteLocationMatched = Partial<RouteLocationMatched>
const route = useRoute()

const list = ref<PartialRouteLocationMatched[]>([])
const getBreadCrumb = () => {
  let matched = route.matched.filter(
    (match) => match.meta.title
  ) as PartialRouteLocationMatched[]

  const first = matched[0]
  if (first && first.path !== "/dashboard") {
    matched = [
      {
        path: "/dashboard",
        meta: { title: "首页" }
      },
      ...matched
    ]
  }
  list.value = matched.filter((item) => item.meta && item.meta.title)
}

const compliePath = (path: string) => {
  const params = route.params
  const resultPath = compile(path)(params)
  return resultPath
}

const handleLink = (route: PartialRouteLocationMatched) => {
  const { path, redirect } = route
  if (redirect) {
    return router.push(redirect as string)
  }
  router.push(compliePath(path!))
}
watch(() => route.path, getBreadCrumb, { immediate: true })
</script>

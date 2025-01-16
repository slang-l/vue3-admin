<template>
  <div class="navbar" flex>
    <Hamburger
      @toggleCollapse="store.toggleSidebar"
      :collapse="store.sidebar.opened"
    ></Hamburger>

    <Breadcumb></Breadcumb>
    <div flex justify-end flex-1 items-center>
      <Screenfull></Screenfull>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Hamburger from "@/layout/components/Hamburger/index.vue"
import { useAppStore } from "@/stores/app"
import Breadcumb from "@/layout/components/Breadcrumb/index.vue"
import Screenfull from "@/layout/components/Screenfull/index.vue"
// import { ref } from "vue"

// 在解构的时候要考虑值是不是对象，如果非对象解构出来就丧失响应式了
const store = useAppStore()
// const collapse = ref(false)
// const handleCollapse = () => {
//   collapse.value = !collapse.value
// }
</script>

<style lang="scss" scoped>
.navbar {
  @apply h-[var(--navbar-height)];
}
</style>

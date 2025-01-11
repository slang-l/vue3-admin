<template>
  <div class="navbar">
    <Hamburger
      @toggleCollapse="store.toggleSidebar"
      :collapse="store.sidebar.opened"
    ></Hamburger>
  </div>
</template>

<script lang="ts" setup>
import Hamburger from "@/layout/components/Hamburger/index.vue"
import { useAppStore } from "@/stores/app"
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

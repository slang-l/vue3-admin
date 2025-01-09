import { defineStore } from "pinia"
import { computed, reactive } from "vue"

export const useAppStore = defineStore(
  "app",
  () => {
    const state = reactive({
      sidebar: {
        opened: true
      }
    })
    const sidebar = computed(() => state.sidebar)

    const toggleSidebar = () => {
      state.sidebar.opened = !state.sidebar.opened
    }
    return { state, sidebar, toggleSidebar }
  },
  {
    persist: {
      storage: window.localStorage,
      pick: ["state.sidebar"]
    }
  }
)

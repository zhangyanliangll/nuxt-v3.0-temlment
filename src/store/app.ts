export const useAppStore = defineStore(
  'app',
  () => {
    return {}
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.cookies(),
      pick: [],
    },
  },
)

// 热重载支持
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}

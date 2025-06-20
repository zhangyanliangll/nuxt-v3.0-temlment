export const useAppStore = defineStore(
  'app',
  () => {
    const locale = ref('zh')

    const setLocale = (lang: string) => {
      locale.value = lang
    }

    return {
      locale,
      setLocale,
    }
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

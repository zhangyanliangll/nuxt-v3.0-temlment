<template>
  <NuxtLayout>
    <NuxtPage
      :keepalive="{ include: keepAliveRouteNames }"
      :transition="{ name: transitionName }"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import useRouteTransitionName from '~/composables/transitions'
import useKeepalive from '~/composables/keepalive'

useHead({
  title: '',
})

const keepAliveRouteNames = computed(() => {
  return useKeepalive().routeCaches as string[]
})

const transitionName = computed(() => {
  return useRouteTransitionName().routeTransitionName
})
</script>

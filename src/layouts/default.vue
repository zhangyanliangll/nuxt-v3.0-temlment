<script setup lang="ts">
defineOptions({
  name: 'BaseLayout',
})

const route = useRoute()

const classNames = computed(() => {
  return route.name
})
</script>

<template>
  <main>
    <AppHeader />
    <div
      :class="classNames"
      class="w-full h-full"
    >
      <slot />
    </div>
  </main>
</template>

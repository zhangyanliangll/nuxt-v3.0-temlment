<script setup lang="ts">
defineOptions({
  name: 'BlankLayout',
})

const route = useRoute()

const classNames = computed(() => {
  return route.name
})
</script>

<template>
  <main>
    <div :class="classNames">
      <slot />
    </div>
  </main>
</template>

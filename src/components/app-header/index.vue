<template>
  <div class="app-header h-[44px]">
    头部
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AppHeader',
})
</script>

<style lang="scss">
.app-header {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>

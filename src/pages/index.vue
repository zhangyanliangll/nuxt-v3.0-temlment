<template>
  <div>
    <div class="title">
      首页
    </div>
    <h1>{{ t('welcome') }}</h1>
    <div
      v-for="(item, index) in list"
      :key="index"
    >
      {{ item.title }}
    </div>
    <div @click="loadData">
      点击 {{ counter }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'

import { getBannerListApi } from '~/apis/common'

const { t } = useI18n()

const counter = useLocalStorage('counter', 0)

const loadData = async () => {
  counter.value++
  await getBannerListApi()
}

const { data: list } = useAsyncData('bannerList', async () => {
  const res = await getBannerListApi()
  return res.data.value
})
console.log('-----------list: ', list.value)
</script>

<style scoped lang="scss">
.title {
  color: #999;
  width: 100px;
  @include text-line(1);
  @include respond-to(phone) {
    color: red;
  }
  @include respond-to(pad) {
    color: blue;
  }
  @include respond-to(notebook) {
    color: green;
  }
}
</style>

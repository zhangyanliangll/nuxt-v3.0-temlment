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
      点击
    </div>
  </div>
</template>

<script setup lang="ts">
import { getBannerListApi } from '~/apis/common'

const { t } = useI18n()

const list = ref<ObjectType[]>([])

const loadData = async () => {
  const { data } = await getBannerListApi()
  list.value = toValue(data)
  console.log(list.value, '-=-=-=list.value')

  console.log('data: ', toValue(data))
}

if (import.meta.server) {
  loadData()
}
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

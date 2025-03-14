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
    <!-- 颜色选择器 --->
    <el-input
      v-model="input"
      style="width: 240px"
    />
    <el-color-picker v-model="color" />
    {{ color }}
    <el-date-picker
      v-model="date"
      type="date"
      value-format="YYYY-MM-DD"
    />
    {{ date }}
    <icon-local-amount
      w="20"
      h="20"
    />
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
  list.value = data.value as ObjectType[]
}

loadData()

const input = ref()
const color = ref()
const date = ref()
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

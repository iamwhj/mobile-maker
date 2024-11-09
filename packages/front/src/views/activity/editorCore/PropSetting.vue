<template>
  <div class="component-setting">
    <div class="title">属性配置 - {{ fullName }}</div>
    <component
      :is="name"
      :key="currentMark"
      :updateComponentProps="updateComponentProps"
      v-bind="config"
    ></component>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import { updateComponent } from '@/common/helper'

const store = useStore()
const currentComponent = computed(() => store.currentComponent || {})
const name = computed(() => currentComponent.value.name + 'Config')
const fullName = computed(() => currentComponent.value.fullName)
const currentMark = computed(() => currentComponent.value.mark)

const config = computed(() => {
  const page = store.page
  
  if (currentComponent.value.name === 'activity') {
    return page.detail
  } else {
    const component = page.components.find(
      (c) => c.mark === currentComponent.value.mark
    )
    const componentConfig = component?.detail || {}
    return componentConfig
  }
})

// 注入更新配置函数
const updateComponentProps = (newDetail, key = 'detail') => {
  updateComponent({ newDetail, key })
}
</script>

<style lang="scss" scoped>
.component-setting {
  height: 100%;
  width: 100%;
  padding: 12px;
  font-size: 14px;
  overflow-y: auto;
  overflow-x: hidden;
  .title {
    font-weight: 500;
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 30px;
  }
}
</style>

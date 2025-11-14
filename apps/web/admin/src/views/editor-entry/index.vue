<script setup>
import { ref, defineAsyncComponent } from 'vue'
import Header from './Header.vue'

// 异步组件
const asyncEditor = defineAsyncComponent(() => import('./SetupEditor.vue'))
const asyncPreview = defineAsyncComponent(() => import('./SetupPreview.vue'))

// 预览
const isPreview = ref(false)
</script>

<template>
  <Header v-model="isPreview" />
  <asyncEditor />
  <asyncPreview v-model="isPreview" v-if="isPreview" />
</template>

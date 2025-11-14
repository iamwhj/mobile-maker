<script setup>
import Editor from '@mk/editor'
import { onBeforeUnmount, onMounted } from 'vue'

let editor = null

onMounted(() => {
  // 实例化editor
  const editorContainer = document.querySelector('#editor')
  editor = new Editor()
  editor.mount(editorContainer)
})

onBeforeUnmount(() => {
  editor.unmount()
})
</script>

<template>
  <div id="editor"></div>
</template>

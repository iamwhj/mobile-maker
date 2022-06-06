<template>
  <div
    class="preview-content"
    @drop.stop.prevent="componentDrap"
    @dragover.prevent
  ></div>
</template>

<script setup>
const componentDrap = (e) => {
  const compoentName = e.dataTransfer.getData('component-drag');
  console.log(compoentName);
};
</script>

<style lang="scss" scoped>
.preview-content {
  height: 100%;
  background-color: rgb(230, 242, 126);
}
</style>

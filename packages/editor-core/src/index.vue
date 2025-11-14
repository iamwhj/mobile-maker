<script setup>
import Render from './render'

const props = defineProps({
  components: { type: Object, required: true },
  currentMark: { type: String, required: true, default: '' },
  switchComponent: { type: Function, required: true },
  clickChock: { type: Function, required: true },
  generateStyle: { type: Function, required: true },
})
</script>

<template>
  <div class="render-container">
    <div
      v-for="component in components"
      :key="component.mark"
      :class="{
        'component-container': true,
        checked: component.mark === currentMark,
      }"
      :style="{ 'text-align': component.style.align }"
      @click="switchComponent(component)"
    >
      <div style="display: inline-block">
        <Render :component="component" :clickChock="clickChock" :generateStyle="generateStyle"></Render>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.component-container {
  display: flex;
}
</style>

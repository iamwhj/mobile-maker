<script setup>
defineProps({
  component: { type: Object, required: true },
  clickChock: { type: Function, required: true },
  generateStyle: { type: Function, required: true },
})
</script>

<template>
  <component
    :is="component.name"
    :class="component.mark"
    v-model:components="component.components"
    v-bind="{
      ...component.detail,
      ...generateStyle(component.style),
    }"
    :clickChock="clickChock(component.click)"
  ></component>
</template>

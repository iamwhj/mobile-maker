<template>
  <svg class="svg-icon">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  color: currentColor;
}
</style>

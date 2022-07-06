<template>
  <span class="suffix">{{ suffix }}</span>
</template>

<script setup>
const props = defineProps({
  suffix: {
    type: String,
    default: 'px',
  },
  gap: {
    type: String,
    default: '8px',
  },
});
</script>

<style lang="scss" scoped>
.suffix {
  margin-left: v-bind(gap);
}
</style>

<template>
  <div class="wrap">
    <div class="container">
      <template v-for="comp in components" :key="comp.id">
        <div>
          <component :is="comp.name" v-bind="comp.ripeParams"></component>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const { VUE_APP_UNIT_WIDTH } = process.env;

// eslint-disable-next-line no-undef
const components = ref(activity.components);
components.value.forEach((comp) => {
  for (const key in comp.style) {
    // 将px转换成rem
    if (typeof comp.style[key] === 'number')
      comp.style[key] = comp.style[key] / VUE_APP_UNIT_WIDTH + 'rem';
  }
  comp.ripeParams = {
    ...comp.style,
    ...comp.detail,
  };
});
</script>

<style lang="scss" scoped></style>

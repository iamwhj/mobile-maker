<template>
  <div class="home-container">
    <div class="left-menu">
      <Nav :menuCollapse="menuCollapse" />
    </div>
    <div class="right-main">
      <TopBar
        :menuCollapse="menuCollapse"
        @changeMenuCollapse="changeMenuCollapse"
      />
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Nav from './Nav.vue';
import TopBar from './TopBar.vue';
import { visitor } from '@/utils/visit';

const menuCollapse = ref(false);
const changeMenuCollapse = () => {
  menuCollapse.value = !menuCollapse.value;
};

onMounted(() => visitor());
</script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  .right-main {
    width: 100%;
    overflow: hidden;
  }
}
</style>

<template>
  <div class="home-container">
    <div class="left-menu" ref="menu">
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
import { ref, onMounted, nextTick } from 'vue';
import Nav from './Nav.vue';
import TopBar from './TopBar.vue';
import { visitor } from '@/utils/visit';

const menuCollapse = ref(false);
const changeMenuCollapse = () => {
  // 由于没有合适的时间点去捕获动画结束时间，暂时关闭菜单收缩功能
  // menuCollapse.value = !menuCollapse.value;
  // 收缩菜单宽度时重新计算
  // resizeLayout();
};

onMounted(() => visitor());

// 动态计算赋值 menu 和 main 的宽度
const menu = ref(null);
const mainWidth = ref('100vw');
const menuWidth = ref(0);
const resizeLayout = () => {
  menuWidth.value = menu.value.offsetWidth + 'px';
  mainWidth.value = `calc(100vw - ${menuWidth.value})`;
};
nextTick(() => resizeLayout());

// 滚动条动画
let timer = null;
window.addEventListener('scroll', function (ev) {
  document.body.toggleAttribute('scroll', true);
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    document.body.toggleAttribute('scroll');
  }, 500);
});
</script>

<style lang="scss" scoped>
.home-container {
  overflow: hidden;
  .left-menu {
    width: auto;
    position: fixed;
  }
  .right-main {
    width: v-bind(mainWidth);
    margin-left: v-bind(menuWidth);
    overflow: hidden;
  }
}
</style>

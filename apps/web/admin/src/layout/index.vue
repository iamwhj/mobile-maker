<template>
  <div class="home-container">
    <div class="left-menu" ref="menu">
      <Nav />
    </div>
    <div class="right-main">
      <Header />
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import Nav from './Nav'
import Header from './Header'
import { useNavStore } from '@mk/stores'
import { visitor } from '@/utils/visit'

const store = useNavStore()
const menuWidth = computed(() => store.menuWidth)

onMounted(() => visitor())

// 滚动条动画
let timer = null
window.addEventListener('scroll', function (ev) {
  document.body.toggleAttribute('scroll', true)
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    document.body.toggleAttribute('scroll')
  }, 500)
})
</script>

<style lang="scss" scoped>
.home-container {
  position: relative;
  width: 100%;
  height: 100%;
  .left-menu {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }
  .right-main {
    position: relative;
    margin-left: v-bind(menuWidth);
    transition: margin-left 0.45s;
    min-height: 100%;
  }
}
</style>

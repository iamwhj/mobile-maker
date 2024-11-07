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
import { ref, onMounted } from 'vue'
import Nav from './Nav'
import TopBar from './TopBar'
import { visitor } from '@/utils/visit'

// 菜单控制，展开和收起
const menuCollapse = ref(false)
const changeMenuCollapse = () => {
  menuCollapse.value = !menuCollapse.value
  // 收缩菜单宽度时重新计算
  resizeLayout()
}

onMounted(() => visitor())

// 动态计算赋值 menu 和 main 的宽度
const menu = ref(null)
const menuWidth = ref('200px')
const resizeLayout = () => {
  if (menuCollapse.value) {
    // 菜单收起
    menuWidth.value = 64 + 'px'
  } else {
    // 菜单展开
    menuWidth.value = 200 + 'px'
  }
}

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

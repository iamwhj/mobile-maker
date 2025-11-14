import { ref } from 'vue'
import { defineStore } from 'pinia'
import { throttle } from '@mk/utils'

export const useNavStore = defineStore('nav', () => {
  // 是否折叠菜单
  const menuCollapse = ref(false)
  const changeMenuCollapse = throttle(() => {
    menuCollapse.value = !menuCollapse.value
    // 收缩菜单宽度时重新计算
    resizeLayout()
  }, 500)

  // 菜单宽度
  const menuWidth = ref('200px')
  function resizeLayout() {
    if (menuCollapse.value) {
      // 菜单收起
      menuWidth.value = 64 + 'px'
    } else {
      // 菜单展开
      menuWidth.value = 200 + 'px'
    }
  }

  return {
    menuWidth,
    menuCollapse,
    changeMenuCollapse,
  }
})

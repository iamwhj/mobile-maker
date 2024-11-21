<template>
  <div class="topBar">
    <div class="menu-controll" @click="changeMenuCollapse">
      <el-tooltip
        :visible="tooltipVisible"
        effect="dark"
        :content="menuCollapse ? '展开' : '收起'"
        placement="right-start"
      >
        <el-icon
          :size="22"
          @mouseenter="tooltipVisible = true"
          @mouseleave="tooltipVisible = false"
        >
          <Fold v-if="!menuCollapse" />
          <Expand v-else />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="right-info">
      <div class="github">
        <a href="//github.com/iamwhj/mobile-maker" target="_blank">
          <img src="//github.com/iamwhj/picx-images-hosting/raw/master/mobile-maker/96cbdd469ebf2a8bed92fe4c0f6bcea6.5xany121jx.webp" title="can you star" />
          <span>仓库</span>
        </a>
      </div>
      <div class="revert" @click="revertActivity">
        <el-icon><House /></el-icon>
        <span>返回活动</span>
      </div>
      <div class="userName">
        <el-icon><Avatar /></el-icon>
        <span>Admin</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Fold, Expand, House, Avatar } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useNavStore } from '@/store/modules/navBar'

const store = useNavStore()

const { menuCollapse } = storeToRefs(store)

const changeMenuCollapse = () => {
  store.changeMenuCollapse()
}

const router = useRouter()
const revertActivity = () => router.push({ path: 'activity' })

// 展开收起菜单tooltip控制
const tooltipVisible = ref(false)
</script>

<style lang="scss" scoped>
.topBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 12px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .menu-controll {
    cursor: pointer;
  }
  .right-info {
    display: flex;
    gap: 20px;
    font-size: 14px;
    .github {
      cursor: pointer;
      a {
        text-decoration: none;
        display: flex;
        align-items: center;
        img {
          width: 80px;
        }
      }
    }
    .revert {
      cursor: pointer;
      margin: auto 0;
    }
    .userName {
      margin: auto 0;
    }
    .el-icon {
      position: relative;
      top: 2px;
      right: 3px;
    }
  }
}
</style>

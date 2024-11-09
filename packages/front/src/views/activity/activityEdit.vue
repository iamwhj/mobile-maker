<template>
  <div class="activity-edit">
    <div class="button-box">
      <div class="operate-btn">
        <el-button @click="preview">预览</el-button>
        <div v-if="!isRelease">
          <el-button @click="save">保存</el-button>
          <el-button type="primary" @click="release">发布</el-button>
        </div>
        <div v-else>
          <el-button type="success" @click="judge('pass')">通过</el-button>
          <el-button type="danger" @click="judge('deny')">不通过</el-button>
        </div>
      </div>
    </div>
    <div class="activity-assemble">
      <div class="components">
        <SideList />
      </div>
      <div class="mobile">
        <CanvasCore />
        <SideControllBar />
      </div>
      <div class="attribute">
        <PropSetting />
      </div>
      <div class="toolsBar">
        <ToolsBar />
      </div>
    </div>
  </div>
  <ActivityPreview
    v-if="isPreview"
    :id="activityId"
    @hidePreview="() => (isPreview = false)"
  />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import SideList from './editorCore/SideList'
import CanvasCore from './editorCore/Canvas'
import PropSetting from './editorCore/PropSetting'
import SideControllBar from '@/components/sideControllBar'
import ToolsBar from '@/components/toolsBar'
import ActivityPreview from './ActivityPreview'
import { openActivityConfig } from '@/common/helper'
import { saveActivity, updateActivity, publishActivity } from '@/api/activity'
import { checkField } from '@/utils/check'
import { formatTime } from '@/utils'
import { useNavStore } from '@/store/modules/navBar'
import { storeToRefs } from 'pinia'

const props = defineProps(['activityId', 'status'])

const router = useRouter()
const store = useStore()
// 默认选中顶部栏
openActivityConfig()

// 收起菜单
const navStore = useNavStore()
const { menuCollapse } = storeToRefs(navStore)
if (!menuCollapse.value) setTimeout(navStore.changeMenuCollapse, 500)

// 保存活动
const save = async () => {
  const page = store.page
  const activity = {
    name: page.detail.name,
    date: JSON.stringify(page.detail.date),
    creator: 'Admin',
    status: 'create',
    page: JSON.stringify(page),
  }

  const checkList = {
    name: { message: '请填写活动名称' },
  }
  if (!checkField(checkList, activity)) return

  if (!props.activityId) {
    // save
    saveActivity(activity).then((result) => {
      const res = result.data
      if (res.code === 0) {
        router.push({
          path: '/activityEdit',
          query: { activityId: res.data.id, status: res.data.status },
        })
        ElMessage({
          type: 'success',
          message: '活动保存成功',
        })
      }
    })
  } else {
    // update
    await new Promise((resolve) => {
      updateActivity({ id: props.activityId, data: activity }).then(
        (result) => {
          const res = result.data
          if (res.code === 0) {
            ElMessage({
              type: 'success',
              message: '活动更新成功',
            })
            resolve()
          }
        }
      )
    })
  }
}

// 预览
const isPreview = ref(false)
const preview = async () => {
  if (!props.activityId) {
    ElMessage({
      type: 'warning',
      message: '请先保存活动',
    })
    return
  }
  // 保存活动
  await save()
  isPreview.value = true
}

// 发布
const isRelease = computed(() => props.status === 'release')
const release = () => {
  if (!props.activityId) {
    ElMessage({
      type: 'warning',
      message: '请先将活动保存再发布',
    })
    return
  }

  const data = { status: 'release' }
  updateActivity({ id: props.activityId, data: data }).then((result) => {
    const res = result.data
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '活动更新至待发布状态，请审核',
      })
      router.push({ path: '/activity' })
    }
  })
}

// 审核
const judge = (type) => {
  let data = {
    status: 'publish',
    reviewer: 'Daw，结果：通过',
    reviewer_time: formatTime(),
  }
  if (type === 'deny') {
    // 不通过
    data = {
      status: 'create',
      reviewer: 'Daw，结果：不通过',
      reviewer_time: formatTime(),
    }
  }
  updateActivity({ id: props.activityId, data: data }).then((result) => {
    const res = result.data
    if (res.code === 0) {
      router.push({ path: '/activity' })
      if (type === 'pass') {
        publishActivity({ id: props.activityId }).then((result) => {
          const res = result.data
          if (res.code === 0) {
            ElMessage({
              type: 'success',
              message: res.message + '，投放链接已生成，请及时查验',
            })
          }
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.activity-edit {
  height: calc(100vh - 50px);
  overflow: hidden;
  .button-box {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding-top: 4px;
    height: 46px;
    border-bottom: 1px solid rgb(242, 236, 236);
    .operate-btn {
      float: right;
      display: flex;
      .el-button {
        margin-right: 12px;
      }
    }
  }
  .activity-assemble {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: calc(100% - 50px);
    .components {
      width: 300px;
      height: 100%;
      // box-shadow: 7px 0px 7px 0px rgb(0 21 41 / 8%);
      border-right: 1px solid #eee;
    }
    .mobile {
      position: relative;
      width: 276px;
      height: 560px;
      background-image: url('@/assets/image/model.png');
      background-repeat: no-repeat;
      background-size: 276px 560px;
      box-sizing: border-box;
      padding: 69px 18px 66px;
    }
    .attribute {
      width: 400px;
      height: 100%;
      border-left: 1px solid #eee;
    }
    .toolsBar {
      position: absolute;
      top: 100px;
      right: 400px;
    }
  }
}
</style>

<script setup>
import { useRouter } from 'vue-router'
import { useEditorStore } from '@mk/stores'
import { checkField } from '@mk/utils'
import { saveApplication, updateApplication, publishApplication, getHtml, saveHtml } from '@mk/api'
import { computed } from 'vue'

const isPreview = defineModel()

const router = useRouter()
const editorStore = useEditorStore()

const appId = computed(() => editorStore.appInfo.appId)

// 返回应用列表
const gotoAppList = () => router.push({ path: 'appList' })

// 保存应用
const save = async (showMsg = true) => {
  const applicationData = editorStore.application

  const application = {
    name: applicationData.detail.name,
    date: JSON.stringify(applicationData.detail.date),
    creator: 'Admin',
    status: 'create',
    page: JSON.stringify(applicationData),
  }

  const checkList = {
    name: { message: '请填写应用名称' },
  }
  if (!checkField(checkList, application)) return

  if (!appId.value) {
    // create application
    await new Promise((resolve) => {
      saveApplication(application).then((result) => {
        const res = result.data
        if (res.code === 0) {
          showMsg &&
            ElMessage({
              type: 'success',
              message: '应用创建成功',
            })
          editorStore.setAppInfo({ appId: res.data.id, status: res.data.status })

          router.replace({ query: { ...router.currentRoute.value.query, appId: res.data.id } })

          resolve(res)
        }
      })
    })
  } else {
    // update application
    await new Promise((resolve) => {
      updateApplication({ id: appId.value, data: application }).then((result) => {
        const res = result?.data
        if (res.code === 0) {
          showMsg &&
            ElMessage({
              type: 'success',
              message: '应用更新成功',
            })
          resolve(res)
        }
      })
    })
  }
}

// 预览
const preview = async () => {
  if (!appId.value) {
    ElMessage({
      type: 'warning',
      message: '请先保存应用',
    })
    return
  }
  // 自动保存一次，确保预览是最新改动
  await save(false)
  isPreview.value = true
}

// 发布
const publish = async () => {
  if (!appId.value) {
    // 新建应用，未生成应用ID，需要先保存创建新应用然后再发布
    await save(false)
  }
  publishApplication({ id: appId.value }).then((result) => {
    const res = result.data
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: res.message + '，投放链接已生成，请及时查验',
      })
    }
  })
}
</script>

<template>
  <div class="editor-header">
    <div class="left">
      <div class="revert" @click="gotoAppList">
        <el-icon><House /></el-icon>
        <span>返回列表</span>
      </div>
    </div>
    <div class="right">
      <el-button @click="preview">预览</el-button>
      <el-button @click="save">保存</el-button>
      <el-button type="primary" @click="publish">发布</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  border-bottom: 1px solid rgb(242, 236, 236);
  .left {
    padding: 0 12px;
    .revert {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
  .right {
    padding: 0 12px;
  }
}
</style>

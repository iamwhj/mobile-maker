<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useNavStore } from '@mk/stores'
import { ElMessage, ElMessageBox } from 'element-plus'
import { CopyDocument } from '@element-plus/icons-vue'
import { getApplicationList, deleteApplication } from '@mk/api'
import { recoverApplicationData, getApplicationModel } from '@mk/editor-helper'

// 展开菜单
const navStore = useNavStore()
const { menuCollapse } = storeToRefs(navStore)
if (menuCollapse.value) navStore.changeMenuCollapse()

// table列表
const applicationList = ref([])
const getList = () => {
  getApplicationList().then((result) => {
    const res = result.data
    if (res.code === 0) {
      applicationList.value = res.data.data
    }
  })
}
getList()

const router = useRouter()
/// 新增应用
const add = () => {
  recoverApplicationData(getApplicationModel())
  router.push({ path: '/editor' })
}
// 编辑应用
const edit = (application) => {
  const applicationData = JSON.parse(application.page)
  recoverApplicationData(applicationData)
  router.push({
    path: '/editor',
    query: { appId: application.id },
  })
}
// 删除应用
const del = (id) => {
  deleteApplication({ id }).then((result) => {
    const res = result.data
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: res.message,
      })
      getList()
    }
  })
}

// 复制访问链接
const copy = (url) => {
  const input = document.createElement('input')
  input.style.opacity = 0
  url = `http://dawsky.top:86/${url}.html`
  input.value = url
  console.log(document.getElementsByClassName('application'))
  const container = document.getElementsByClassName('application')[0]
  container.appendChild(input)
  input.select()
  document.execCommand('copy')
  container.removeChild(input)
  ElMessage.success('端外链接复制成功')
}
</script>

<template>
  <div class="application">
    <div class="operate-box">
      <el-button type="primary" @click="add">创建应用</el-button>
    </div>
    <div class="list">
      <el-table :data="applicationList">
        <el-table-column label="序号" width="90">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="应用名称">
          <template #default="scope">
            <el-link @click="edit(scope.row)">{{ scope.row.name }}</el-link>
            <el-icon
              v-if="scope.row.status === 'publish'"
              @click="copy(scope.row.id)"
              style="cursor: pointer"
            >
              <CopyDocument />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="应用ID" width="90" />
        <el-table-column prop="creator" label="创建人" />
        <el-table-column prop="create_time" label="创建时间" width="110" />
        <el-table-column prop="publisher" label="发布人" />
        <el-table-column prop="publisher_time" label="发布时间" width="110" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag
              :type="
                scope.row.status === 'release'
                  ? 'warning'
                  : scope.row.status === 'publish'
                    ? 'success'
                    : 'info'
              "
              >{{ scope.row.status }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-link type="primary" @click="edit(scope.row)">编辑</el-link>
            <el-popconfirm
              confirmButtonText="确定"
              cancelButtonText="取消"
              title="确定删除吗？"
              @confirm="del(scope.row.id)"
            >
              <template #reference>
                <el-link type="danger">删除</el-link>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.application {
  padding: 12px;
  .operate-box {
    margin-bottom: 20px;
  }
  .el-link {
    margin-right: 10px;
  }
}
</style>

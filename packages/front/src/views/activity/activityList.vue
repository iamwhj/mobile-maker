<template>
  <div class="activity">
    <div class="operate-box">
      <el-button type="primary" @click="add">添加活动</el-button>
    </div>
    <div class="list">
      <el-table :data="activityList">
        <el-table-column label="序号" width="90">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="活动名称">
          <template #default="scope">
            <el-link @click="edit(scope.row)">{{ scope.row.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="活动ID" />
        <el-table-column prop="creator" label="创建人" />
        <el-table-column prop="create_time" label="创建时间" width="110" />
        <el-table-column prop="reviewer" label="审核人" />
        <el-table-column prop="reviewer_time" label="审核时间" width="110" />
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
            <el-link type="warning" @click="judge(scope.row)">审核</el-link>
            <el-link type="danger" @click="del(scope.row.id)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getActivityList, deleteActivity } from '@/api/activity';
import { recoverPageData } from '@/commom/helper';
import { getActivityTemplateData } from '@/commom';
import { useStore } from 'vuex';
import { ElMessage, ElMessageBox } from 'element-plus';

// table列表
const activityList = ref([]);
const getList = () => {
  getActivityList().then((result) => {
    const res = result.data;
    if (res.code === 0) {
      activityList.value = res.data.data;
    }
  });
};
getList();

const router = useRouter();
const store = useStore();
// 新增活动
const add = () => {
  recoverPageData(store, getActivityTemplateData());
  router.push({ path: '/activityEdit' });
};
// 编辑活动
const edit = (activity) => {
  const page = JSON.parse(activity.page);
  recoverPageData(store, page);
  router.push({
    path: '/activityEdit',
    query: { activityId: activity.id, status: activity.status },
  });
};
// 审核活动
const judge = (activity) => {
  if (activity.status !== 'release') {
    ElMessage({
      type: 'warning',
      message: '活动未进入审核状态',
    });
    return;
  }
  edit(activity);
};
// 删除活动
const del = (id) => {
  ElMessageBox.confirm('确认删除该活动吗?', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deleteActivity({ id }).then((result) => {
        const res = result.data;
        if (res.code === 0) {
          ElMessage({
            type: 'success',
            message: res.message,
          });
          getList();
        }
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      });
    });
};
</script>

<style lang="scss" scoped>
.activity {
  padding: 12px;
  .operate-box {
    margin-bottom: 20px;
  }
  .el-link {
    margin-right: 10px;
  }
}
</style>

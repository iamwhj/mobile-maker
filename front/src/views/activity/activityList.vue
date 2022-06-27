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
        <el-table-column prop="reviewer_time" label="审核时间" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-link type="primary" @click="edit(scope.row)">编辑</el-link>
            <el-link type="warning" disable>审核</el-link>
            <el-link type="danger">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getActivityList } from '@/api/activity';
import { recoverPageData } from '@/commom/helper';
import { getActivityTemplateData } from '@/commom';
import { useStore } from 'vuex';

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
const add = () => {
  recoverPageData(store, getActivityTemplateData());
  router.push({ path: '/activityEdit' });
};
const edit = (activity) => {
  const page = JSON.parse(activity.page);
  recoverPageData(store, page);
  router.push({ path: '/activityEdit', query: { activityId: activity.id } });
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

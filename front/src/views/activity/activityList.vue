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
        <el-table-column prop="name" label="活动名称" width="180" />
        <el-table-column prop="id" label="活动ID" />
        <el-table-column prop="creator" label="创建人" />
        <el-table-column prop="create_time" label="创建时间" />
        <el-table-column prop="reviewer" label="审核人" />
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
import { useRouter } from 'vue-router';

const activityList = [
  {
    name: 'hello activity',
    id: 1,
    creator: 'daw',
    create_time: '2022-06-02',
    reviewer: 'daw',
    status: '创建',
  },
];

const router = useRouter();
const add = () => router.push({ path: '/activityEdit' });
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

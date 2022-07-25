<template>
  <div class="editable">
    <el-table :data="tableData" border size="small">
      <el-table-column width="50">
        <template #default="scope">
          <div class="orderNumBox">{{ scope.$index + 1 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template #default="scope">
          <editable-cell v-model="scope.row.name" />
        </template>
      </el-table-column>
      <el-table-column label="数据A">
        <template #default="scope">
          <editable-cell v-model="scope.row.dataA" />
        </template>
      </el-table-column>
      <el-table-column label="数据B">
        <template #default="scope">
          <editable-cell v-model="scope.row.dataB" :denyCell="denyDataB" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-link type="danger" @click="del(scope.$index)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="add-button" @click="add"> 添加 </el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EditableCell from './editableCell';

const props = defineProps({
  dataSource: { type: Array, required: true }, // 表格数据源
  denyDataB: { type: Boolean, default: false }, // 是否禁用DataB
  onAddHook: { type: Function, default: () => {} }, // 添加操作的hook函数
  onDeleteHook: { type: Function, default: () => {} }, // 删除操作的hook函数
});

let count = 0;
const tableData = ref(props.dataSource);

// 删除
const del = (i) => {
  // call hook
  props.onDeleteHook(tableData.value[i], i);
  tableData.value.splice(i, 1);
};

// 增加
const add = () => {
  const { dataSource } = props;
  if (dataSource.length < 8) {
    const lastItem = dataSource[dataSource.length - 1];
    count = lastItem ? lastItem.key + 1 : 0;
    const newData = {
      key: count,
      name: null,
      dataA: null,
      dataB: null,
    };
    tableData.value.push(newData);

    // call hook
    props.onAddHook(newData);
  }
};

// 初始化处理
const createHandeler = () => {
  // 如果初始化表格只存在一行时，额外增加两空行
  if (typeof tableData.value === 'object' && tableData.value.length === 1) {
    for (let i = 0; i < 2; i++) add();
  }
};
createHandeler();
</script>

<style lang="scss" scoped>
.editable {
  position: relative;
  .el-table {
    :deep(.cell) {
      padding: 0;
    }
    :deep(.el-table__cell) {
      padding: 0;
    }
  }
  .orderNumBox {
    height: 100%;
    line-height: 33px;
    background: #fafafa;
    text-align: center;
  }
  .add-button {
    margin-top: 24px;
  }
}
</style>

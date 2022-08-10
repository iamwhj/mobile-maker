<template>
  <div class="category-list">
    <el-button type="primary" class="add-btn" @click="addVisible = true">
      添加分类
    </el-button>
    <el-table :data="categoryList" style="width: 800px">
      <el-table-column label="序号" width="90">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="分类名称" />
      <el-table-column prop="priority" label="分类排序" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-link
            type="primary"
            @click="edit(scope.row)"
            style="margin-right: 10px"
          >
            编辑
          </el-link>
          <el-link type="danger" @click="del(scope.row.id)" disabled>
            删除
          </el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="addVisible" title="添加分类" width="460px">
    <el-form :model="addCategory" label-width="90px">
      <el-form-item label="分类名称">
        <el-input v-model="addCategory.name" />
      </el-form-item>
      <el-form-item label="分类排序">
        <el-input v-model.number="addCategory.priority" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="addCategoryFn">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="editVisible" title="编辑分类" width="460px">
    <el-form :model="editCategory" label-width="90px">
      <el-form-item label="分类名称">
        <el-input v-model="editCategory.name" />
      </el-form-item>
      <el-form-item label="分类排序">
        <el-input v-model.number="editCategory.priority" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="editCategoryFn">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import {
  getCategoryList,
  saveCategory,
  updateCategory,
  deleteCategory,
} from '@/api/category';
import { removeFieldForMongodb } from '@/utils';

// 获取分类列表
const categoryList = ref([]);
const getClassList = () => {
  getCategoryList().then((result) => {
    const res = result.data;
    if (res.code === 0) {
      categoryList.value = res.data;
    }
  });
};
getClassList();

// 添加分类
const addVisible = ref(false);
const addCategory = ref({});
const addCategoryFn = () => {
  saveCategory(addCategory.value).then((result) => {
    const res = result.data;
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '分类添加成功',
      });
      getClassList();
      addVisible.value = false;
      addCategory.value = {};
    }
  });
};

// 编辑分类
let editId = -1;
const editVisible = ref(false);
const editCategory = ref({});
const edit = (data) => {
  const ripeData = removeFieldForMongodb(data);
  editId = data.id;
  editCategory.value = ripeData;
  editVisible.value = true;
};
const editCategoryFn = () => {
  updateCategory({
    id: editId,
    data: editCategory.value,
  }).then((result) => {
    const res = result.data;
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '分类更新成功',
      });
      getClassList();
      editVisible.value = false;
    }
  });
};

// 删除分类
const del = (id) => {
  deleteCategory({ id }).then((result) => {
    const res = result.data;
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '分类删除成功',
      });
      getClassList();
    }
  });
};
</script>

<style lang="scss" scoped>
.category-list {
  padding: 12px;
  .add-btn {
    margin-bottom: 12px;
  }
}
</style>

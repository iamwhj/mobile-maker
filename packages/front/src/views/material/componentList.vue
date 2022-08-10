<template>
  <div class="component-list">
    <el-button type="primary" class="add-btn" @click="add">
      添加组件
    </el-button>
    <el-table :data="componentList">
      <el-table-column label="序号" width="90">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="full_name" label="组件标题" />
      <el-table-column prop="name" label="组件名称" />
      <el-table-column prop="path" label="组件图标" />
      <el-table-column prop="author" label="组件作者" />
      <el-table-column prop="category_id" label="组件分类" />
      <el-table-column prop="priority" label="组件排序" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-link
            type="primary"
            @click="edit(scope.row)"
            style="margin-right: 10px"
          >
            编辑
          </el-link>
          <el-link type="danger" @click="del(scope.row.id)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="addVisible" title="添加组件" width="460px">
    <el-form :model="addComponent" label-width="90px">
      <el-form-item label="组件分类">
        <el-select
          v-model="addComponent.category_id"
          placeholder="请选择组件分类"
        >
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="组件代码">
        <el-upload
          :action="action"
          :show-file-list="false"
          :on-success="successCompUpload"
          :before-upload="beforeCompUpload"
        >
          <el-button type="danger">上传组件</el-button>
          <template #tip>
            <div class="el-upload__tip">请将组件代码压缩成zip格式上传</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="组件标题">
        <el-input v-model="addComponent.full_name" />
      </el-form-item>
      <el-form-item label="组件名称">
        <el-input v-model="addComponent.name" />
      </el-form-item>
      <el-form-item label="组件图标">
        <el-input v-model="addComponent.path" />
      </el-form-item>
      <el-form-item label="组件排序">
        <el-input v-model.number="addComponent.priority" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="addComponentFn">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="editVisible" title="编辑组件" width="460px">
    <el-form :model="editComponent" label-width="90px">
      <el-form-item label="组件分类">
        <el-select
          v-model="editComponent.category_id"
          placeholder="请选择组件分类"
        >
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="组件代码">
        <el-upload
          :action="action"
          :show-file-list="false"
          :on-success="successCompUpload"
          :before-upload="beforeCompUpload"
        >
          <el-button type="danger">上传组件</el-button>
          <template #tip>
            <div class="el-upload__tip">请将组件代码压缩成zip格式上传</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="组件标题">
        <el-input v-model="editComponent.full_name" />
      </el-form-item>
      <el-form-item label="组件名称">
        <el-input v-model="editComponent.name" />
      </el-form-item>
      <el-form-item label="组件图标">
        <el-input v-model="editComponent.path" />
      </el-form-item>
      <el-form-item label="组件排序">
        <el-input v-model.number="editComponent.priority" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="editComponentFn">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { getCategoryList } from '@/api/category';
import {
  getComponentList,
  updateComponent,
  deleteComponent,
  saveComponent,
} from '@/api/component';
import { removeFieldForMongodb } from '@/utils';

// 获取分类列表
const categoryList = ref([]);
const getCategoryListFn = () => {
  getCategoryList().then((result) => {
    const res = result.data;
    if (res.code === 0) {
      categoryList.value = res.data;
    }
  });
};
getCategoryListFn();
// 获取组件列表
const componentList = ref([]);
const getCompList = () => {
  getComponentList().then((result) => {
    const res = result.data;
    if (res.code === 0) {
      componentList.value = res.data;
    }
  });
};
getCompList();

// 添加组件
const addVisible = ref(false);
const addComponent = ref({});
const add = () => {
  addVisible.value = true;
  addComponent.value = {};
  dialogType = 'add';
};
const addComponentFn = () => {
  if (!addComponent.value.version) {
    ElMessage.error('还未上传组件代码');
    return false;
  }

  // 没做登录系统，先设置默认作者
  addComponent.value.author = 'Admin';
  saveComponent(addComponent.value).then((result) => {
    const res = result.data;
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '组件添加成功',
      });
      getCompList();
      addVisible.value = false;
      addComponent.value = {};
    }
  });
};

// 编辑组件
let editId = -1;
const editVisible = ref(false);
const editComponent = ref({});
const edit = (data) => {
  editId = data.id;
  const ripeData = removeFieldForMongodb(data);
  editComponent.value = ripeData;
  editVisible.value = true;
  dialogType = 'edit';
};
const editComponentFn = () => {
  updateComponent({
    id: editId,
    data: editComponent.value,
  }).then((result) => {
    const res = result.data;
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '组件更新成功',
      });
      getCompList();
      editVisible.value = false;
    }
  });
};

// 删除组件
const del = (id) => {
  deleteComponent({ id }).then((result) => {
    const res = result.data;
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '组件删除成功',
      });
      getCompList();
    }
  });
};

// 组件上传地址
const action = process.env.VUE_APP_BUILD_URL + '/upload-component';
// 组件上传格式校验
const beforeCompUpload = (rawFile) => {
  if (rawFile.type !== 'application/x-zip-compressed') {
    ElMessage.error('上传的格式必须是zip');
    return false;
  }
  return true;
};
// 组件上传成功
let dialogType = 'add';
const successCompUpload = (res, file) => {
  ElMessage.success('组件代码上传成功');
  const version = res.data.version;
  if (dialogType === 'add') {
    // 添加组件
    addComponent.value.version = version;
  } else {
    // 编辑组件(记录上一个版本)
    editComponent.value.lastVersion = editComponent.value.version;
    editComponent.value.version = version;
  }
};
</script>

<style lang="scss" scoped>
.component-list {
  padding: 12px;
  .add-btn {
    margin-bottom: 12px;
  }
}
</style>

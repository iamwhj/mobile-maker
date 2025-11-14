<script setup>
import { reactive, ref, watch } from 'vue'
import BaseSetting from '../../../../shared/baseSetting'
import ClickEventInput from '../../../../shared/clickEventInput'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
  updateComponentProps: { type: Function },
  src: { type: String, default: '' },
})

const form = reactive({
  src: props.src,
})

watch(form, () => {
  props.updateComponentProps(form)
})

// 图片资源
const type = ref('upload')
const action = `${import.meta.env.VITE_IMAGE_URL}/base/uploadImage`
// 图片格式检验
const beforeAvatarUpload = (rawFile) => {
  const typeList = ['image/jpeg', 'image/png']
  if (!typeList.includes(rawFile.type)) {
    ElMessage.error('文件格式不正确，仅支持jpeg和png格式！')
    return false
  }
  return true
}
// 图片上传成功
const handleAvatarSuccess = (response) => {
  const { code, message, imgUrl } = response
  if (code === 0) {
    ElMessage.success('图片上传成功！')
    form.src = imgUrl
  } else {
    ElMessage.error(message || '上传失败！')
  }
}
</script>

<template>
  <el-form :model="form">
    <el-form-item label="图片资源：">
      <el-radio-group v-model="type">
        <el-radio label="upload">上传</el-radio>
        <el-radio label="link">链接</el-radio>
      </el-radio-group>
      <el-input v-if="type === 'link'" v-model="form.src" placeholder="请输入图片链接" style="width: 220px" />
      <div v-else style="width: 100%">
        <el-upload
          class="avatar-uploader"
          :action="action"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </div>
    </el-form-item>
    <el-form-item label="点击事件：">
      <ClickEventInput />
    </el-form-item>
  </el-form>
  <BaseSetting></BaseSetting>
</template>

<style lang="scss" scoped>
.avatar-uploader :deep(.el-upload) {
  border: 1px dashed #b4b6b8;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: 0.2s;
}

.avatar-uploader :deep(.el-upload):hover {
  border-color: #0c82f8;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 180px;
  height: 180px;
  text-align: center;
}
</style>

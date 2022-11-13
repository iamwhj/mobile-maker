import { ElMessage } from 'element-plus';

// 检查字段是否存在
export const checkField = (checkList, checkData) => {
  for (const k in checkList) {
    if (!checkData[k] || checkData[k].length === 0) {
      ElMessage({
        type: checkList[k].type || 'warning',
        message: checkList[k].message || `请填写${k}字段`,
      });
      return false;
    }
  }
  return true;
};

// 判断是否容器组件
export const isContainerComponent = (componentName) => {
  // carrier
  const containerList = ['carrier'];
  if (containerList.includes(componentName)) return true;
  return false;
};

import { ref } from 'vue'

export const useHistory = () => {
  // 历史操作数据
  const historyData = ref([])

  // 重置历史记录
  function resetHistoryData() {
    historyData.value = []
  }
  function addHistoryData(history) {
    // 添加历史记录数据
    historyData.value.unshift(history)
  }

  return {
    historyData,
    resetHistoryData,
    addHistoryData,
  }
}

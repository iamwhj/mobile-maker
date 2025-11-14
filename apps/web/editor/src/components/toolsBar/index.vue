<template>
  <div class="tools-box">
    <ul>
      <li>
        <el-icon :size="20" color="#ccc"><BrushFilled /></el-icon>
      </li>
      <li>
        <el-popover placement="left" :width="160" trigger="hover">
          <template #reference>
            <el-icon :size="20"><Tickets /></el-icon>
          </template>
          <el-table :data="historyData" size="small" max-height="200px">
            <el-table-column label="历史记录">
              <template #default="scope">
                <el-link :underline="false" @click="recoverData(scope.row)">
                  {{ scope.row.name }}
                </el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-popover>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { BrushFilled, Tickets } from '@element-plus/icons-vue'
import { useEditorStore } from '@mk/stores'
import { recoverApplicationData } from '@mk/editor-helper'

const store = useEditorStore()
const historyData = store.historyData

const recoverData = (historyItem) => recoverApplicationData(historyItem.data)
</script>

<style lang="scss" scoped>
.tools-box {
  background: rgb(245, 245, 245);
  border-left: 1px solid #eee;
  border-bottom: 1px solid #eee;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      width: 26px;
      height: 35px;
      line-height: 40px;
      text-align: center;
    }
  }
}
</style>

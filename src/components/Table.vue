<template>
  <div class="table">
    <div class="table-header">
      <slot name="header">
        <div v-if="title" class="title">{{ title }}</div>
        <div class="options">
          <slot name="headerOptions"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="data"
      border
      style="width: 100%"
      @selection-change="onSelectionChange"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        width="60"
        align="center"
      />
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        width="60"
        align="center"
      />
      <template v-for="(item, i) in column" :key="i">
        <el-table-column
          :prop="item.props"
          :label="item.label"
          :width="item.width"
          :align="item.align ? item.align : 'left'"
        >
          <template #default="scoped">
            <slot :name="item.slotName" :row="scoped.row">
              {{ scoped.row[item.props] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="table-footer">
      <slot name="footer">
        <el-pagination
          :currentPage="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="pageSizes"
          :layout="pageLayout"
          :total="pageTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String
    },
    column: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    pageTotal: {
      type: Number,
      default: 0
    },
    pageInfo: {
      type: Object,
      default: () => {
        return { currentPage: 0, pageSize: 10 }
      }
    },
    pageLayout: {
      type: String,
      default: ['total', 'sizes', 'prev', 'pager', 'next', 'jumper'].join()
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [5, 9, 10, 20]
      }
    }
  },
  emits: ['selectionChange', 'update:pageInfo'],
  setup (props, { emit }) {
    const onSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    const handleSizeChange = (pageSize: number) => {
      const currentPage = 1
      emit('update:pageInfo', { ...props.pageInfo, pageSize, currentPage })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:pageInfo', { ...props.pageInfo, currentPage })
    }
    return {
      onSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
<style lang="less" scoped>
.table {
  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    padding: 0 5px;
    .title {
      font-size: 20px;
      font-weight: 700;
    }
    .options {
      align-items: center;
    }
  }
  .table-footer {
    margin-top: 15px;
    .el-pagination {
      text-align: right;
    }
  }
}
</style>

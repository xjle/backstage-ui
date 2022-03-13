<template>
  <el-result title="404" sub-title="Sorry, page missing" icon="warning">
    <template #extra>
      <el-button type="primary">
        <router-link to="/">返回首页</router-link></el-button
      >
    </template>
  </el-result>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup () {
    return {}
  }
})
</script>

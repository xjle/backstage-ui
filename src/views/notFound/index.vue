<template>
  <el-result title="404" sub-title="Sorry, page missing" icon="warning">
    <template #extra>
      <el-button type="primary">  <router-link to="/">返回首页</router-link></el-button>
    </template>
  </el-result>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { getBook } from '@/api/book'
export default defineComponent({
  setup () {
    onMounted(() => {
      getBook().then(res => {
        console.log(res)
      })
    })
    return {}
  }
})
</script>

<template>
  <div class="auto">
    <el-card>
      <template #header>欢迎{{ autoFlag ? "登录" : "注册" }}</template>
    </el-card>

  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const autoFlag = ref(true)
    return {
      autoFlag
    }
  }
})
</script>
<style lang="less" scoped>
.auto {
  background: url("../../assets/images/login-bj.jpg") no-repeat;
  background-size: 100% 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-card {
    width: 35%;
    text-align: center;
  }
}
</style>

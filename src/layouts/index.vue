<template>
  <el-container class="main">
    <el-header></el-header>
    <el-container class="container">
      <el-aside>
        <Menu />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Menu from '@/components/Menu.vue'
import { useStore } from 'vuex'
import { userInfoApi } from '@/api/userInfo'
export default defineComponent({
  components: {
    Menu
  },
  setup () {
    const store = useStore()
    const getUserInfo = async () => {
      const { data } = await userInfoApi()
      if (data.code === 200) {
        store.commit('SET_USERINFO', data.data)
      }
    }
    getUserInfo()
    return {}
  }
})
</script>
<style lang="less" scoped>
.main {
  height: 100%;

  .el-header {
    height: 4.25rem /* 68/16 */;
    background: pink;
  }
  .container {
    .el-aside {
      width: 13%;
    }
    .el-main {
      height: calc(100% - 68px);
    }
  }
}
</style>

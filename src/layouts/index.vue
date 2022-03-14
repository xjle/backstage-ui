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
  width: 100% /* 1920/16 */;
  min-width: 51.125rem /* 818/16 */;

  .el-header {
    height: 4.25rem /* 68/16 */;
  }
  .container {
    height: calc(100% - 4.25rem);
    .el-aside {
      width: 13.125rem /* 210/16 */;
      height: 100%;
    }
    .el-main {
      width: calc(100% - 13.125rem /* 210/16 */ );
      overflow: auto;
      background: pink;
    }
  }
}
</style>

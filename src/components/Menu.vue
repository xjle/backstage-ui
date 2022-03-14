<template>
  <div class="menu">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"

      text-color="#fff"
      style="height: 100%"
      :default-active="urlIndex + ''"
    >
      <template v-for="(item, index) in userMenus" :key="item.mid">
        <el-menu-item
          :index="index + ''"
          @click="handleItemClick(item.url, index)"
        >
          <i v-if="item.icon" :class="item.icon"></i>
          <el-icon v-else><icon-menu /></el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
      <!-- <template v-for="item in userMenus" :key="item.id">
          <template v-if="item.type === 1">
            <el-sub-menu :index="item.id + ''">
              <template #title>
                <i v-if="item.icon" :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
              <template v-for="subItem in item.children" :key="subItem.id">
                <el-menu-item
                  :index="subItem.id + ''"
                  @click="handleItemClick(subItem)"
                >
                  <i v-if="subItem.icon" :class="subItem.icon"></i>
                  <span>{{ subItem.name }}</span>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <template v-else-if="item.type === 2">
            <el-menu-item :index="item.id + ''">
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>
        </template> -->
    </el-menu>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { Menu as IconMenu } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: {
    IconMenu
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const userMenus = computed(() => store.state.userInfo.menu)
    const urlIndex = computed(() => store.state.urlIndex)
    const handleItemClick = (url: string, index: number) => {
      store.commit('SET_URL_INDEX', index)
      router.push({
        path: '/' + url ?? '/notFound'
      })
    }
    return {
      urlIndex,
      userMenus,
      handleItemClick
    }
  }
})
</script>
<style lang="less" scoped>
.menu{
  height: 100%;
  width: 100%;
  // /deep/ .el-menu-item{
  //   width: 100%;

  // }
}
</style>

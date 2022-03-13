<template>
  <div class="auto">
    <el-card>
      <template #header>···欢迎{{ autoFlag ? "登录" : "注册" }}···</template>
      <el-form
        ref="autoFormRef"
        :rules="autoRules"
        :model="autoForm"
        class="auto-form"
      >
        <el-form-item prop="mail">
          <el-input v-model="autoForm.mail" placeholder="邮箱">
            <template #prefix>
              <i class="iconfont icon-user" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="autoForm.password"
            placeholder="密码"
            type="password"
          >
            <template #prefix>
              <i class="iconfont icon-password" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code" class="auto-code">
          <el-input v-model="autoForm.code" placeholder="验证码"> </el-input>
          <el-button type="primary" @click="onGetCode" :disabled="codeFlag"
            >获取验证码{{ codeFlag ? `（${time}）` : "" }}</el-button
          >
        </el-form-item>
        <el-form-item class="auto-forget" v-if="autoFlag">
          <router-link to="/"><span>忘记密码？</span></router-link>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="autoDisabled" type="primary" @click="onSubmit(autoFormRef)">{{
            autoFlag ? "登录" : "注册"
          }}</el-button>
        </el-form-item>
        <el-form-item class="auto-auto">
          <template v-if="autoFlag">
            还没账号?<span @click="changeAuto">去注册</span>
          </template>
          <template v-else>
            <span @click="changeAuto">直接登录</span>
          </template>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts">
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, onBeforeUnmount, reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { IAutoForm } from '@/types/auto'
import { getCode, loginApi, registerApi } from '@/api/userInfo'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
const TIME = 60 // 验证码禁用时间

export default defineComponent({
  setup () {
    // 路由
    const router = useRouter()
    // vuex状态管理
    const store = useStore()
    // 登录注册展示
    const autoFlag = ref(true)
    // 登录注册按钮
    const autoDisabled = ref(false)
    // 表单ref
    const autoFormRef = ref<InstanceType<typeof ElForm>>()
    // 表单数据
    const autoForm = reactive<IAutoForm>({
      mail: '',
      password: '',
      code: ''
    })
    // 表单规则
    const autoRules = reactive({
      mail: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
    })
    // 验证码按钮
    const codeFlag = ref(false)
    // 验证码时间
    const time = ref(TIME)
    // 定时器
    const timer = ref()
    // 发送验证码事件
    const onGetCode = () => {
      const { mail } = autoForm
      // 单独校验mail
      autoFormRef.value?.validateField('mail', () => null)
      if (mail) {
        codeFlag.value = true
        getCode({ mail }).then((res:any) => {
          const { data } = res
          if (data.code === 200) {
            timer.value = setInterval(() => {
              if (time.value <= 0) {
                codeFlag.value = false
                clearInterval(timer.value)
                time.value = TIME
              }
              time.value -= 1
            }, 1000)
          }
        })
      }
    }
    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return
      formEl.validate(async (valid) => {
        ElMessage.closeAll()
        if (valid) {
          autoDisabled.value = true
          if (autoFlag.value) {
            //  登陆了
            const { data } = await loginApi(autoForm)
            ElMessage({
              message: data.msg,
              type: data.code === 200 ? 'success' : 'error'
            })
            if (data.code === 200) {
              store.commit('SET_TOKEN', data.data.token)
              router.push('/admin')
            }
            autoDisabled.value = false
          } else {
            //  注册
            const { data } = await registerApi(autoForm)
            ElMessage({
              message: data.msg,
              type: data.code === 200 ? 'success' : 'error'
            })
            if (data.code === 200) {
              autoFlag.value = false
            }
            autoDisabled.value = false
          }
        }
      })
    }
    const changeAuto = () => {
      clearInterval(timer.value)
      codeFlag.value = false
      time.value = TIME
      autoFlag.value = !autoFlag.value
      autoFormRef.value?.resetFields()
    }
    onBeforeUnmount(() => {
      // 销毁前注销定时器，避免报错
      clearInterval(timer.value)
    })
    return {
      autoFlag,
      autoFormRef,
      autoForm,
      autoRules,
      codeFlag,
      time,
      onSubmit,
      onGetCode,
      changeAuto
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
    width: 420px;
    text-align: center;

    .auto-form {
      width: 80%;
      text-align: center;
      margin: 0 auto;
      .auto-auto,
      .auto-forget {
        span {
          cursor: pointer;
          color: #0e90d2;
          &:hover {
            color: #095f8a;
          }
        }
      }
      .auto-forget {
        /deep/.el-form-item__content {
          justify-content: end;
        }
      }
      .auto-auto {
        /deep/.el-form-item__content {
          justify-content: center;
        }
      }

      .auto-code {
        /deep/.el-form-item__content {
          justify-content: space-between;

          .el-input {
            width: 55%;
          }
          .el-button {
            width: 40%;
          }
        }
      }
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>

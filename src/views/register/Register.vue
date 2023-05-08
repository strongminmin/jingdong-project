<template>
    <div class="wrapper">
        <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img">
        <div class="wrapper__input">
            <input type="text" class="wrapper__input__content" placeholder="请输入用户名" v-model='username'>
        </div>
        <div class="wrapper__input">
            <input type="password" class="wrapper__input__content" placeholder="请输入密码" v-model="password" autocomplete="new-password">
        </div>
        <div class="wrapper__input">
            <input type="password" class="wrapper__input__content" placeholder="确认密码" v-model="confirmPassword">
        </div>
        <div class="wrapper__register-button" @click="handleRegister">注册</div>
        <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登录</div>
    </div>
    <Toast v-if="show" :message="toastMessage"/>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import { useRouter } from 'vue-router'
import Toast, { useToastEffect } from '../../components/Toast.vue'
import router from '@/router'

// 处理注册相关逻辑
const useRegisterEffect = (showToast) => {
  const data = reactive({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const handleRegister = async () => {
    try {
      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword
      })
      // console.log(result)
      if (result?.errno === 0) {
        router.push({ name: 'Login' })
        // showToast('注册成功')
        //   alert('注册成功')
      } else {
        showToast('注册失败')
        //   alert('注册失败')
      }
    } catch (e) {
      showToast('请求失败')
      // alert('请求失败')
    }
  }
  const { username, password, confirmPassword } = toRefs(data)
  return { username, password, confirmPassword, handleRegister }
}
// 处理注册跳转
const useLoginEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginClick }
}
export default {
  name: 'Register',
  components: { Toast },
  //   代码执行的主流程
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, confirmPassword, handleRegister } = useRegisterEffect(showToast)
    const { handleLoginClick } = useLoginEffect()

    return { username, password, confirmPassword, show, toastMessage, handleLoginClick, handleRegister }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);

    &__img {
        display: block;
        margin: 0 auto .4rem auto;
        width: .66rem;
        height: .66rem;
    }

    &__input {
        box-sizing: border-box;
        height: .48rem;
        margin: 0 .4rem .16rem .4rem;
        padding: 0 .16rem;
        background: #f9f9f9;
        border: .01rem solid rgba(0, 0, 0, 0.10);
        border-radius: .06rem;

        &__content {
            line-height: .48rem;
            background: none;
            width: 100%;
            border: none;
            outline: none;
            font-size: .16rem;
            color: $content-notice-fontColor;

            &::placeholder {
                color: $content-notice-fontColor;
            }
        }
    }

    &__register-button {
        line-height: .48rem;
        margin: .32rem .4rem .16rem .4rem;
        background: $btn-bgColor;
        box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
        border-radius: .04rem;
        color: $bgColor;
        font-size: .16rem;
        text-align: center;
    }

    &__register-link {
        text-align: center;
        font-size: .14rem;
        color: $content-notice-fontColor;
    }
}
</style>

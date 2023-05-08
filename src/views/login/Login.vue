<template>
    <div class="wrapper">
        <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" />
        <div class="wrapper__input">
            <input type="text" class="wrapper__input__content" placeholder="用户名" v-model="username">
        </div>
        <div class="wrapper__input">
            <input type="password" class="wrapper__input__content" placeholder="请输入密码" v-model="password" autocomplete="new-password">
        </div>
        <div class="wrapper__login-button" @click="handleLogin">登陆</div>
        <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
    </div>
    <Toast v-if="show" :message="toastMessage" />
</template>

<script>
// 系统级别的引入放在最顶部
// 自己写的放在底下
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
// import axios from 'axios'
import { post } from '../../utils/request.js'
import Toast, { useToastEffect } from '../../components/Toast.vue'

// 将showToast弹窗 的相关逻辑摘出来
// 由于 showToast弹窗可以是共用的代码逻辑，故可以放在components下的 Toast.vue 内部
// const useToastEffect = () => {
//   const toastData = reactive({
//     showToast: false,
//     toastMessage: ''
//   })
//   const showToast = (message) => {
//     toastData.showToast = true
//     toastData.toastMessage = message
//     setTimeout(() => {
//       toastData.showToast = false
//       toastData.toastMessage = ''
//     }, 2000)
//   }
//   return { toastData, showToast }
// }

// 将handleLogin函数提出来
// 处理登录相关逻辑代码
const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const handleLogin = async () => {
    try {
      const { username, password } = data
      if (username === '' || password === '') {
        showToast('请输入用户名或密码')
        return
      }
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登陆失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}
// 处理登录跳转
const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegisterClick = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegisterClick }
}

export default {
  name: 'Login',
  components: { Toast },
  //   更关注主程序中的管理
  //   setup 的职责就是 告诉我们 代码执行的一个流程
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegisterClick } = useRegisterEffect()

    return { username, password, show, toastMessage, handleLogin, handleRegisterClick }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables";

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
            margin-top: .12rem;
            line-height: .22rem;
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

    &__login-button {
        line-height: .48rem;
        margin: .32rem .4rem .16rem .4rem;
        background: $btn-bgColor;
        box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
        border-radius: .04rem;
        color: $bgColor;
        font-size: .16rem;
        text-align: center;
    }

    &__login-link {
        text-align: center;
        font-size: .14rem;
        color: $content-notice-fontColor;
    }
}</style>

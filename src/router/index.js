import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/home/Home'
// import Login from '../views/login/Login'
// import Register from '../views/register/Register'
// import Shop from '../views/shop/Shop'
const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
  },
  {
    path: '/login',
    name: 'Login',
    // component: Login,
    // 使用异步路由会让代码执行更快，因此将上面一行代码改成下面
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
    // 访问 Login页面之前才会执行 下面的 beforeEnter 方法
    beforeEnter (to, from, next) {
      // const isLogin = localStorage.isLogin
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
      // if (isLogin) {
      //   next({ name: 'Home' })
      // } else {
      //   next()
      // }
    }
  },
  {
    path: '/register',
    name: 'Register',
    // component: Register,
    component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),
    beforeEnter (to, from, next) {
      const { isRegister } = localStorage
      isRegister ? next({ name: 'Login' }) : next()
    }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    // component: Shop,
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
  },
  {
    path: '/cartList',
    name: 'CartList',
    // component: Shop,
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartList')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    // component: Shop,
    component: () => import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    // component: Shop,
    component: () => import(/* webpackChunkName: "orderList" */ '../views/orderList/OrderList')
  }

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // to 表示即将访问的页面
  // from 表示从哪个页面跳转来的
  // localStorage 表示本地存储

  // console.log(to, from)
  // next()
  // const isLogin = localStorage.isLogin
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register');
  // (isLogin || to.name === 'Login')
  //   ? next()
  //   : next({ name: 'Login' });
  // (isResigter || to.name === 'Register')
  //   ? next()
  //   : next({ name: 'Register' })

  // 上面代码简写成以下：
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' })

  // if (isLogin || to.name === 'Login') {
  //   next()
  // } else {
  //   next({ name: 'Login' })
  // }
})

export default router

import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList) || {}
  } catch (e) {
    return {}
  }
}

export default createStore({
  state: {
    // cartList: {}
    cartList: getLocalCartList()
    // cartList: {
    // 希望的数据结构是： 第一层级是商铺的id，第二层是商品id，第二层的内容是商品内容以及购物数量
    //   shopId: {
    //     productId: {
    //       _id: '1',
    //       name: '番茄250g/份',
    //       imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    //       sales: 10,
    //       price: 33.6,
    //       oldPrice: 39.6,
    //       count: 2
    //     }
    //   }

    // 数据结构变更 ： 加上shopname
    // shopId: {
    //       shopName: '沃尔玛',
    //       productList:{
    //         productId: {
    //           _id: '1',
    //           name: '番茄250g/份',
    //           imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    //           sales: 10,
    //           price: 33.6,
    //           oldPrice: 39.6,
    //           count: 2
    //         }
    //       }
    //     }

    // 数据结构可以使用下面方式进行注释
    // {shopId:{shopName:'', productList:{productId:{}}}}

    // }
  },
  getters: {
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo, num } = payload

      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
      // if (!shopInfo) { shopInfo = {} }
      let product = shopInfo.productList[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count = product.count + num
      if (num > 0) {
        product.check = true
      }
      if (product.count < 0) { product.count = 0 }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },

    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },

    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },

    setCartItemChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const key in products) {
          const product = products[key]
          product.check = true
        }
      }
      setLocalCartList(state)
    },

    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },

    clearCartData (state, payload) {
      const { shopId } = payload
      delete state.cartList[shopId]
    }
  },
  actions: {
  },
  modules: {
  }
})

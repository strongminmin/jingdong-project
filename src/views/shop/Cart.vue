<template>
    <div class="mask" v-if="showCart && calculations.total > 0" @click="handleCartShowChange" />
    <div class="cart">
        <div class="product" v-if="showCart && calculations.total > 0">
            <div class="product__header">
                <div class="product__header__all" @click="() => setCartItemChecked(shopId)">
                    <span class="product__header__icon iconfont"
                        v-html="calculations.allChecked ? '&#xe600;' : '&#xe619;'"></span>
                    全选
                </div>
                <div class="product__header__clear"><span class="product__header__clear__btn"
                        @click="() => { cleanCartProducts(shopId) }">清空购物车</span></div>
            </div>

            <div class="product__item" v-for="item in productList" :key="item._id">
                <div class="product__item__checked iconfont" v-html="item.check ? '&#xe600;' : '&#xe619;'"
                    @click="() => { changeCartItemCheck(shopId, item._id) }"></div>
                <img class="product__item__img" :src="item.imgUrl" alt="" />
                <div class="product__item__detail">
                    <h4 class="product__item__title">{{ item.name }}</h4>
                    <p class="product__item__price">
                        <span class="product__item__yen">&yen;</span>{{ item.price }}
                        <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
                    </p>
                </div>
                <div class="product__number">
                    <span class="product__number__minus iconfont"
                        @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }">&#xe677;</span>
                    {{ item.count || 0 }}
                    <span class="product__number__plus iconfont"
                        @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }">&#xe845;</span>
                </div>
            </div>

        </div>
        <div class="check">
            <div class="check__icon">
                <img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="check__icon__img"
                    @click="handleCartShowChange">
                <div class="check__icon__tag">{{ calculations.total }}</div>
            </div>
            <div class="check__info">
                总计：<span class="check__info__price">&yen; {{ calculations.price }}</span>
            </div>
            <div class="check__btn" v-show="calculations.price > 0">
                <router-link :to="{ path: `/orderConfirmation/${shopId}` }">
                    去结算
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

// 获取购物车信息逻辑
const useCartEffect = (shopId) => {
  const { calculations, changeCartItemInfo, productList } = useCommonCartEffect(shopId)
  const store = useStore()
  //   const cartList = store.state.cartList

  //   const total = computed(() => {
  //     const productList = cartList[shopId]?.productList
  //     let count = 0
  //     if (productList) {
  //       for (const i in productList) {
  //         const product = productList[i]
  //         count += product.count
  //       }
  //     }
  //     return count
  //   })

  //   const allChecked = computed(() => {
  //     const productList = cartList[shopId]?.productList
  //     let result = true
  //     if (productList) {
  //       for (const i in productList) {
  //         const product = productList[i]
  //         if (product.count > 0 && !product.check) {
  //           result = false
  //         }
  //       }
  //     }
  //     return result
  //   })

  //   const price = computed(() => {
  //     const productList = cartList[shopId]?.productList
  //     let count = 0
  //     if (productList) {
  //       for (const i in productList) {
  //         const product = productList[i]
  //         if (product.check) {
  //           count += (product.count * product.price)
  //         }
  //       }
  //     }
  //     return count.toFixed(2)
  //   })

  //   将上述三个计算属性写在一个函数内

  //   const calculations = computed(() => {
  //     const productList = cartList[shopId]?.productList
  //     const result = { total: 0, price: 0, allChecked: true }
  //     // let total = 0
  //     // let allChecked = true
  //     // let price = 0
  //     if (productList) {
  //       for (const i in productList) {
  //         const product = productList[i]
  //         result.total += product.count
  //         if (product.count > 0 && !product.check) {
  //           result.allChecked = false
  //         }
  //         if (product.check) {
  //           result.price += (product.count * product.price)
  //         }
  //       }
  //     }
  //     result.price = result.price.toFixed(2)
  //     return result
  //   })

  //   const productList = computed(() => {
  //     const productList = cartList[shopId]?.productList || []
  //     return productList
  //   })

  const changeCartItemCheck = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }

  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }
  const setCartItemChecked = () => {
    store.commit('setCartItemChecked', { shopId })
  }
  return { calculations, productList, shopId, changeCartItemInfo, changeCartItemCheck, cleanCartProducts, setCartItemChecked }
}

// 展示隐藏购物车逻辑
const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}

export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { calculations, productList, changeCartItemInfo, changeCartItemCheck, cleanCartProducts, setCartItemChecked } = useCartEffect(shopId)
    const { showCart, handleCartShowChange } = toggleCartEffect()
    return { calculations, productList, shopId, showCart, changeCartItemInfo, changeCartItemCheck, cleanCartProducts, setCartItemChecked, handleCartShowChange }
  }
}

</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import "../../style/mixins.scss";

.mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 1;
}

.cart {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background: $bgColor;
}

.product {
    flex: 1;
    overflow-y: scroll;
    background: $bgColor;

    &__header {
        display: flex;
        line-height: .52rem;
        border-bottom: .01rem solid $content-bgColor;
        font-size: .14rem;
        color: $content-fontColor;

        &__all {
            width: .64rem;
            margin-left: .18rem;
        }

        &__icon {
            display: inline-block;
            margin-right: .1rem;
            vertical-align: top;
            color: $btn-bgColor;
            font-size: .2rem;
        }

        &__clear {
            flex: 1;
            margin-right: .16rem;
            text-align: right;

            &__btn {
                display: inline-block;
            }
        }
    }

    &__item {
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid $content-bgColor;

        &__checked {
            line-height: .5rem;
            margin-right: .2rem;
            color: $btn-bgColor;
            font-size: .2rem;
        }

        &__detail {
            overflow: hidden;
        }

        &__img {
            width: .46rem;
            height: .46rem;
            margin-right: .16rem;
        }

        &__title {
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: $content-fontColor;
            @include ellipsis;
        }

        &__price {
            margin: .06rem 0 0 0;
            line-height: .2rem;
            font-size: .14rem;
            color: $hightlight-fontColor;
        }

        &__yen {
            font-size: .12rem;
        }

        &__origin {
            margin-left: .06rem;
            line-height: .2rem;
            font-size: .12rem;
            color: $light-fontColor;
            text-decoration: line-through;
        }
    }

    .product__number {
        position: absolute;
        bottom: .12rem;
        right: 0;

        // &__minus,
        // &__plus {
        //     display: inline-block;
        //     width: .2rem;
        //     height: .2rem;
        //     line-height: .16rem;
        //     border-radius: 50%;
        //     font-size: .2rem;
        //     text-align: center;
        // }

        &__minus {
            position: relative;
            top:.02rem;
            color: $medium-fontColor;
            margin-right: .05rem;
        }

        &__plus {
            position: relative;
            top:.02rem;
            color: $btn-bgColor;
            margin-left: .05rem;
        }
    }

}

.check {
    display: flex;
    height: .49rem;
    border-top: .01rem solid $content-bgColor;
    line-height: .49rem;

    &__icon {
        position: relative;
        width: .84rem;

        &__img {
            display: block;
            margin: .12rem auto;
            width: .28rem;
            height: .26rem;
        }

        &__tag {
            position: absolute;
            left: .46rem;
            top: .04rem;
            padding: 0 .04rem;
            min-width: .2rem;
            height: .2rem;
            line-height: .2rem;
            background: $hightlight-fontColor;
            border-radius: .1rem;
            font-size: .12rem;
            text-align: center;
            color: $bgColor;
            transform: scale(.5);
            transform-origin: left center;
        }
    }

    &__info {
        flex: 1;
        color: $content-fontColor;
        font-size: .12rem;

        &__price {
            line-height: .49rem;
            color: $hightlight-fontColor;
            font-size: .18rem;
        }
    }

    &__btn {
        width: .98rem;
        background-color: $iconColor;
        text-align: center;
        // color: $bgColor;
        font-size: .14rem;

        a {
            color: $bgColor;
            // text-decoration: none;
        }
    }
}</style>

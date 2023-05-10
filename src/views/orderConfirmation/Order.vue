<template>
    <div class="order">
        <div class="order__price">实付金额 <b>￥{{ calculations.price }}</b></div>
        <div class="order__btn" @click="handleShowConfirmChange(true)" v-show="showSubmitBtn">提交订单</div>
    </div>
    <div class="mask" v-show="showConfirm" @click="handleShowConfirmChange(false)">
        <div class="mask__content" @click.stop>
            <h3 class="mask__content__title">确认要离开收银台？</h3>
            <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
            <div class="mask__content__btns">
                <div class="mask__content__btn mask__content__btn--first" @click="() => handleConfirmOrder(true)">取消订单</div>
                <div class="mask__content__btn mask__content__btn--last" @click="() => handleConfirmOrder(false)">确认支付</div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { post } from '../../utils/request'
import { useCommonCartEffect } from '../../effects/cartEffects'
import { useToastEffect } from '../../components/Toast.vue'

// 下单相关逻辑
const useMakeOrderEffect = (shopId, shopName, productList, addressId) => {
  const router = useRouter()
  const store = useStore()
  const { showToast } = useToastEffect()

  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    // console.log(productList)
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({ id: parseInt(product._id, 10), num: product.count })
    }
    // console.log(products)
    try {
      const result = await post('/api/order', {
        addressId,
        shopId,
        shopName: shopName.value,
        isCanceled: isCanceled,
        products
      })
      // console.log(result)
      if (result?.errno === 0) {
        const cartList = JSON.parse(localStorage.cartList || {})
        delete cartList[shopId]
        localStorage.cartList = JSON.stringify(cartList)
        store.commit('clearCartData', { shopId })
        router.push({ name: 'OrderList' })
      } else {
        showToast('下单失败')
        // 提示下单失败
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  return { handleConfirmOrder }
}

// 蒙层展示相关逻辑
const useShowConfirmChange = () => {
  const showConfirm = ref(false)

  const handleShowConfirmChange = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleShowConfirmChange }
}

export default {
  name: 'Order',
  setup () {
    const route = useRoute()
    const shopId = parseInt(route.params.id, 10)
    const { calculations, shopName, productList } = useCommonCartEffect(shopId)

    // const showConfirm = ref(false)
    // const handleShowConfirmChange = (status) => {
    //   showConfirm.value = status
    // }
    const { showConfirm, handleShowConfirmChange } = useShowConfirmChange()
    const { handleConfirmOrder } = useMakeOrderEffect(shopId, shopName, productList, route.query.addressId)

    // const handleConfirmOrder = async (isCanceled) => {
    //   const products = []
    //   // console.log(productList)
    //   for (const i in productList.value) {
    //     const product = productList.value[i]
    //     products.push({ id: parseInt(product._id, 10), num: product.count })
    //   }
    //   // console.log(products)
    //   try {
    //     const result = await post('/api/order', {
    //       addressId: 1,
    //       shopId,
    //       shopName: shopName.value,
    //       isCanceled: isCanceled,
    //       products
    //     })
    //     // console.log(result)
    //     if (result?.errno === 0) {
    //       store.commit('clearCartData', { shopId })
    //       router.push({ name: 'OrderList' })
    //     } else {
    //       showToast('下单失败')
    //       // 提示下单失败
    //     }
    //   } catch (e) {
    //     showToast('请求失败')
    //   }
    // }
    return { showSubmitBtn: !!route.query.addressId, calculations, showConfirm, handleConfirmOrder, handleShowConfirmChange }
  }

}
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";

.order {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    height: .49rem;
    line-height: .49rem;
    background: $bgColor;
    font-size: .14rem;

    &__price {
        flex: 1;
        text-indent: .24rem;
        color: $content-fontColor;
    }

    &__btn {
        width: .98rem;
        background: $iconColor;
        color: $bgColor;
        text-align: center;
    }
}

.mask {
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba($color: #000000, $alpha: .50);

    &__content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 3rem;
        height: 1.56rem;
        background: $bgColor;
        border-radius: .04rem;
        text-align: center;

        &__title {
            margin: .24rem 0 0 0;
            line-height: .26rem;
            font-size: .18rem;
            color: $content-fontColor;

        }

        &__desc {
            margin: .08rem 0 0 0;
            font-size: .14rem;
            color: $medium-fontColor;
        }

        &__btns {
            display: flex;
            margin: .24rem .58rem 0 .58rem;
        }

        &__btn {
            flex: 1;
            width: .8rem;
            line-height: .32rem;
            border-radius: .16rem;
            font-size: .14rem;

            &--first {
                margin-right: .12rem;
                border: .01rem solid $iconColor;
                color: $iconColor;
            }

            &--last {
                margin-left: .12rem;
                background: $iconColor;
                color: $bgColor;
            }
        }

    }
}
</style>

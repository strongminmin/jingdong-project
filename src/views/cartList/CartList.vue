<template>
  <div>
    <div class="wrapper">
      <div class="title">我的全部购物车</div>
      <div
        class="cart"
        v-for="(cart, key) in list"
        :key="key"
        @click = "handleCartClick(key)"
      >
        <div class="cart__title">{{ cart.shopName }}</div>
        <div class="cart__item" v-for="(product, innerKey) in cart.productList" :key="innerKey">
          <img :src="product.imgUrl" alt="" class="cart__image">
          <div class="cart__content">
            <p class="cart__content__title">{{ product.name }}</p>
            <p class="cart__content__price">
              <span class="yen">&yen;</span>{{ product.price }} × {{ product.count }}
              <span class="cart__content__total">{{ (product.price * product.count).toFixed(2) }}</span>
            </p>

          </div>
        </div>
        <div class="cart__total">
          共计{{ cart.total }} 件
        </div>
      </div>
      <div class="empty" v-if="Object.keys(list).length === 0">暂无购物数据</div>
    </div>
    <Docker :currentIndex='1' />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import Docker from '../../components/Docker.vue'

export default {
  name: 'CartList',
  components: { Docker },
  setup () {
    const list = JSON.parse(localStorage.cartList || '[]')
    // console.log(list)
    // 计算购物车总件数的逻辑
    for (const i in list) {
      const cart = list[i]
      const productList = cart.productList
      let total = 0
      for (const j in productList) {
        // console.log(productList[j])
        const product = productList[j]
        total += product.count
      }
      cart.total = total
      // console.log(cart)
    }

    // 处理点击
    const router = useRouter()
    const handleCartClick = (key) => {
      router.push(`/orderConfirmation/${key}`)
    }
    return { list, handleCartClick }
  }
}

</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.wrapper {
  overflow-y: auto;
  // position: absolute;
  // left: 0;
  // top: 0;
  // bottom: .5rem;
  // right: 0;
  @include fix-content;
  background: $darkBgColor;
  // padding: 0 .18rem .2rem .18rem;
  // background: green;
}

.title {
  // line-height: .44rem;
  // background: $bgColor;
  // color: $content-fontColor;
  // font-size: .16rem;
  // text-align: center;
  @include title;
}

.cart {
  margin: .16rem;
  padding-bottom: .16rem;
  background: $bgColor;

  &__title {
    padding: .16rem;
    line-height: .22rem;
    font-size: .16rem;
    color: $content-fontColor;
    @include ellipsis
  }

  &__item {
    display: flex;
    padding: 0 .16rem .16rem .16rem;
  }

  &__image {
    flex: none;
    margin-right: .16rem;
    width: .46rem;
    height: .46rem;
  }

  &__content {
    flex: 1;

    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontColor;
      @include ellipsis
    }

    &__price {
      margin: 0;
      color: $hightlight-fontColor;
      font-size: .12rem;
    }

    .yen {
      font-size: .12rem;
    }

    &__total {
      float: right;
      color: $dark-fontColor;
    }
  }

  &__total {
    line-height: .28rem;
    margin: 0 .16rem .16rem .16rem;
    color: $light-fontColor;
    font-size: .14rem;
    text-align: center;
    background: $search-bgColor;
  }
}
.empty {
  margin-top: .5rem;
  line-height: .5rem;
  text-align: center;
  font-size: .16rem;
  color: $light-fontColor;
}
</style>

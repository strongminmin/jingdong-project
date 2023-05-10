<template>
  <div class="shop">
    <img :src="item.imgUrl" alt="" class="shop__img">
    <div :class="{ 'shop__content': true, 'shop__content--bordered': hideBorder ? false : true }">
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售：{{ item.sales }}</span>
        <span class="shop__content__tag">起送：{{ item.expressLimit }}</span>
        <span class="shop__content__tag">基础运费：{{ item.expressPrice }}</span>
        <!-- <span v-for="(innerItem, innerIndex) in item.tags" class="shop__content__tag" :key="innerIndex">{{innerItem}}</span> -->
      </div>
      <p class="shop__content__highlight">{{ item.slogan }}</p>
      <div class="shop__products" v-if="item.products">
        <div class="shop__product" v-for="product in item.products" :key="product.name" >
          <img :src="product.imgUrl" alt="" class="shop__product__img">
          <p class="shop__product__title">{{ product.name }}</p>
          <p class="shop__product__price">
            <span class="yen">&yen;</span><span class="price">{{ product.price }}</span>
            <span class="origin">&yen;{{ product.oldPrice }}</span>
          </p>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideBorder']
}
</script>
<style  lang="scss">
@import '../style/viriables.scss';
@import '../style/mixins.scss';

.shop {
  display: flex;
  padding: .12rem 0 0 0;

  &__img {
    width: .56rem;
    height: .56rem;
    margin-right: .16rem;
  }

  &__content {
    padding-bottom: .12rem;

    &--bordered {
      border-bottom: .01rem solid $content-bgColor;
    }

    flex: 1;

    &__title {
      line-height: .22rem;
      font-size: .16rem;
      color: $content-fontColor;
    }

    &__tags {
      margin: .08rem 0 0 0;
      line-height: .18rem;
      font-size: .13rem;
      color: $content-fontColor

    }

    &__tag {
      margin-right: .16rem;
    }

    &__highlight {
      color: $hightlight-fontColor;
    }
  }

  &__products {
    overflow: hidden;
    margin: .08rem .07rem 0 -.18rem;
  }
  &__product {
    width: 33.33%;
    padding-left: .18rem;
    box-sizing: border-box;
    float: left;
    &__img {
      width: 100%;
    }
    &__title {
      margin: .04rem 0 0 0;
      line-height: .17rem;
      font-size: .12rem;
      color: $content-fontColor;
      @include ellipsis;
    }
    &__price {
      line-height: .2rem;
      margin: .02rem 0 0 0;
      font-size: .14rem;
      color: $light-fontColor;
      @include ellipsis;
      .yen {
        font-size: .12rem;
        color: $hightlight-fontColor;

      }
      .price {
        color: $hightlight-fontColor;
      }
      .origin {
        margin-left: .06rem;
        font-size: .12rem;
        text-decoration:line-through;
      }
    }
  }
}</style>

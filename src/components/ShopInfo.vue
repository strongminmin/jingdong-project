<template>
    <div class="shop">
            <img :src="item.imgUrl" alt="" class="shop__img">
            <div :class="{'shop__content':true, 'shop__content--bordered': hideBorder ? false : true}">
                <div class="shop__content__title">{{  item.name }}</div>
                <div class="shop__content__tags">
                  <span class="shop__content__tag">月售：{{item.sales}}</span>
                  <span class="shop__content__tag">起送：{{item.expressLimit}}</span>
                  <span class="shop__content__tag">基础运费：{{item.expressPrice}}</span>
                    <!-- <span v-for="(innerItem, innerIndex) in item.tags" class="shop__content__tag" :key="innerIndex">{{innerItem}}</span> -->
                </div>
                <p class="shop__content__highlight">{{item.slogan}}</p>
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
      &__content{
        padding-bottom: .12rem;
        &--bordered{
            border-bottom: 1px solid $content-bgColor;
        }
        flex: 1;
        &__title {
          line-height: .22rem;
          font-size: .16rem;
          color: $content-font-color;
        }
        &__tags {
          margin: .08rem 0 0 0;
          line-height: .18rem;
          font-size: .13rem;
          color: $content-font-color;

        }
        &__tag {
          margin-right: .16rem;
        }
        &__highlight {
          color: $hightlight-fontColor;
        }
      }
    }
</style>

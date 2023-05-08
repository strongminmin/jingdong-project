<template>
    <div class="wrapper">
        <!-- <div class="top">
            <div class="top__bgcor"></div>
            <div class="top__header">
                <div class="iconfont top__header__back" @click="handleBackClick">&#xe8ef;</div>
                确认订单
            </div>
            <div class="top__receiver">
                <div class="top__receiver__title">收货地址</div>
                <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
                <div class="top__receiver__info">
                    <span class="top__receiver__info__name">瑶妹（先生）</span>
                    <span class="top__receiver__info__tele">13428765491</span>
                </div>
                <div class="iconfont top__receiver__icon">&#xe8ef;</div>

            </div>
        </div> -->
        <TopArea />
        <!-- <div class="products">
            <div class="products__title">{{ shopName }}</div>
            <div class="products__wrapper">
                <div class="products__list">
                    <template v-for="item in ProductList" :key="item._id">
                        <div class="products__item"  v-if="item.count > 0">
                            <img class="products__item__img" :src="item.imgUrl" alt="" />
                            <div class="products__item__detail">
                                <h4 class="products__item__title">{{ item.name }}</h4>
                                <p class="products__item__price">
                                    <span>
                                        <span class="products__item__yen">&yen;</span>{{ item.price }} × {{ item.count }}
                                    </span>
                                    <span class="products__item__total">
                                        <span class="products__item__yen">&yen;</span>{{ (item.price * item.count).toFixed(2) }}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div> -->
        <ProductList />
        <!-- <div class="order">
            <div class="order__price">实付金额 <b>￥{{ calculations.price }}</b></div>
            <div class="order__btn">提交订单</div>
        </div> -->
        <Order />
    </div>
</template>
<script>
import TopArea from './TopArea.vue'
import ProductList from './ProductList.vue'
import Order from './Order.vue'

export default {
  name: 'OrderConfirmation',
  components: { TopArea, ProductList, Order }

  //   setup () {
  //     // const router = useRouter()
  //     const route = useRoute()
  //     const shopId = route.params.id
  //     const { calculations } = useCommonCartEffect(shopId)
  //     // const handleBackClick = () => {
  //     //   router.back()
  //     // }
  //     return { calculations }
  //   }

}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #eee;
    overflow-y: scroll;
}

// .top {
//     position: relative;
//     height: 1.96rem;
//     background-size: 100% 1.59rem;
//     background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 4%, #0091FF 50%);
//     background-repeat: no-repeat;

//     &__header {
//         position: relative;
//         padding-top: .26rem;
//         line-height: .24rem;
//         color: #fff;
//         text-align: center;
//         font-size: .16rem;

//         &__back {
//             position: absolute;
//             left: .18rem;
//         }
//     }

//     &__receiver {
//         position: absolute;
//         left: .18rem;
//         right: .18rem;
//         bottom: 0;
//         height: 1.11rem;
//         background: #fff;
//         border-radius: .04rem;

//         &__title {
//             line-height: .22rem;
//             padding: .16rem 0 .14rem .16rem;
//             font-size: .16rem;
//             color: #333;
//         }

//         &__address {
//             line-height: .2rem;
//             padding: 0rem .4rem 0 .16rem;
//             font-size: .14rem;
//             color: #333;
//         }

//         &__info {
//             padding: .06rem 0 0 .16rem;
//             color: #666;
//             font-size: .12rem;
//             line-height: .18rem;

//             &__name {
//                 margin-right: .06rem;
//             }
//         }

//         &__icon {
//             transform: rotate(180deg);
//             position: absolute;
//             top: .55rem;
//             right: .16rem;
//             font-size: .2rem;
//             color: #666;
//         }
//     }
// }

// .products {
//     margin: .16rem .18rem .2rem .18rem;
//     background: #fff;

//     &__title {
//         padding: .16rem;
//         font-size: .16rem;
//         color: #333;
//     }

//     &__wrapper {
//         position: absolute;
//         overflow-y: scroll;
//         margin: 0 .18rem;
//         left: 0;
//         right: 0;
//         bottom: .6rem;
//         top: 2.6rem;
//     }

//     &__list {
//         background: #fff;
//     }

//     &__item {
//         position: relative;
//         display: flex;
//         padding: 0 .16rem .16rem .16rem;

//         &__img {
//             width: .46rem;
//             height: .46rem;
//             margin-right: .16rem;
//         }

//         &__detail {
//             flex: 1;
//             // overflow: hidden;
//         }

//         &__title {
//             margin: 0;
//             line-height: .2rem;
//             font-size: .14rem;
//             color: $content-font-color;
//             @include ellipsis;
//         }

//         &__price {
//             display: flex;
//             margin: .06rem 0 0 0;
//             line-height: .2rem;
//             font-size: .14rem;
//             color: $hightlight-fontColor;
//         }

//         // &__single {
//         //     // width: 1rem;
//         // }
//         &__total {
//             text-align: right;
//             flex: 1;
//             color: #000;
//         }

//         &__yen {
//             font-size: .12rem;
//         }
//     }
// }

// .order {
//     position: absolute;
//     right: 0;
//     left: 0;
//     bottom: 0;
//     display: flex;
//     height: .49rem;
//     line-height: .49rem;
//     background: #fff;
//     font-size: .14rem;

//     &__price {
//         flex: 1;
//         text-indent: .24rem;
//         color: #333;
//     }

//     &__btn {
//         width: .98rem;
//         background: #4FB0F9;
//         color: #fff;
//         text-align: center;
//     }
// }
</style>

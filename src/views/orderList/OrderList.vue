<template>
    <div>
        <div class="wrapper">
            <div class="title">我的订单</div>
            <div class="orders">
                <div class="order" v-for="(item, index) in list" :key="index">
                    <div class="order__title">{{ item.shopName }}
                        <span class="order__status">{{ item.isCanceled ? '已取消' : '已下单' }}</span>
                    </div>
                    <div class="order__content">
                        <div class="order__content__imgs">
                            <template v-for="(innerItem, innerIndex) in item.products" :key="innerIndex">
                                <img :src="innerItem.product.img" class="order__content__img" v-if="innerIndex <= 3">
                            </template>

                        </div>
                        <div class="order__content__info">
                            <div class="order__content__price">￥{{item.totalPrice}}</div>
                            <div class="order__content__count">共{{ item.totalNumber }}件</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Docker :currentIndex='2' />
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import Docker from '../../components/Docker.vue'

// 处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getNearbyList = async () => {
    const result = await get('/api/order')
    // console.log(result, '---result---')
    // console.log(result.data, '---result data---')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      orderList.forEach((order) => {
        const products = order.products || []
        let totalPrice = 0
        let totalNumber = 0
        products.forEach((productItem) => {
          totalNumber += productItem?.orderSales || 0
          totalPrice += ((productItem?.product?.price * productItem?.orderSales) || 0)
        })
        order.totalNumber = totalNumber
        order.totalPrice = totalPrice
      })

      //   console.log(orderList)

      data.list = result.data
    }
  }
  getNearbyList()
  const { list } = toRefs(data)
  return { list }
}
export default {
  name: 'OrderList',
  components: { Docker },
  setup () {
    const { list } = useOrderListEffect()
    // console.log(list)
    return { list }
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
    @include title;
}

.orders {}

.order {
    margin: .16rem .18rem;
    padding: .16rem;
    background: $bgColor;

    &__title {
        line-height: .22rem;
        font-size: .16rem;
        color: $content-fontColor;
        margin-bottom: .16rem;
    }

    &__status {
        float: right;
        font-size: .14rem;
        color: $light-fontColor;
    }

    &__content {
        display: flex;

        &__imgs {
            flex: 1;
        }

        &__img {
            width: .4rem;
            height: .4rem;
            margin-right: .12rem;
        }

        &__info {
            width: .7rem;
        }

        &__price {
            margin-bottom: .04rem;
            line-height: .2rem;
            font-size: .14rem;
            color: $hightlight-fontColor;
            text-align: right;
        }

        &__count {
            line-height: .14rem;
            font-size: .12rem;
            color: $content-fontColor;
            text-align: center;
        }

    }

}
</style>

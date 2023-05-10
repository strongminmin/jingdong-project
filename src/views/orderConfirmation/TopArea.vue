<template>
    <div class="top">
        <div class="top__bgcor"></div>
        <div class="top__header">
            <div class="iconfont top__header__back" @click="handleBackClick">&#xe8ef;</div>
            确认订单
        </div>
        <div class="top__receiver" @click="handleAddressClick">
            <div class="top__receiver__title">收货地址</div>
            <div class="top__receiver__address">
                {{ hasAddress ? `${data.city}${data.department}${data.houseNumber}` : '请选择收获地址' }}
            </div>
            <div class="top__receiver__info" v-if="hasAddress">
                <span class="top__receiver__info__name">{{data.name}}</span>
                <span class="top__receiver__info__tele">{{data.phone}}</span>
            </div>
            <div class="iconfont top__receiver__icon">&#xe8ef;</div>

        </div>
    </div>
</template>
<script>
import { onBeforeMount, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'

export default {
  name: 'TopArea',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const data = reactive({})
    const addressId = route.query.addressId
    const handleBackClick = () => {
      router.back()
    }
    const handleAddressClick = () => {
      //   console.log(route.path)
      router.push(`/addressSelect?path=${route.path}`)
    }
    onBeforeMount(async () => {
      const result = await get('/api/user/address/&{addressId}')
      if (result?.errno === 0) {
        const resultData = result.data
        data.city = resultData.city
        data.department = resultData.department
        data.houseNumber = resultData.houseNumber
        data.name = resultData.name
        data.phone = resultData.phone
      }
    })
    return { data, hasAddress: !!addressId, handleBackClick, handleAddressClick }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';

.top {
    position: relative;
    height: 1.96rem;
    background-size: 100% 1.59rem;
    background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 4%, $btn-bgColor 50%);
    background-repeat: no-repeat;

    &__header {
        position: relative;
        padding-top: .2rem;
        line-height: .24rem;
        color: $bgColor;
        text-align: center;
        font-size: .16rem;

        &__back {
            position: absolute;
            left: .18rem;
        }
    }

    &__receiver {
        position: absolute;
        left: .18rem;
        right: .18rem;
        bottom: 0;
        height: 1.11rem;
        background: $bgColor;
        border-radius: .04rem;

        &__title {
            line-height: .22rem;
            padding: .16rem 0 .14rem .16rem;
            font-size: .16rem;
            color: $content-fontColor;
        }

        &__address {
            line-height: .2rem;
            padding: 0rem .4rem 0 .16rem;
            font-size: .14rem;
            color: $content-fontColor;
        }

        &__info {
            padding: .06rem 0 0 .16rem;
            color: $medium-fontColor;
            font-size: .12rem;
            line-height: .18rem;

            &__name {
                margin-right: .06rem;
            }
        }

        &__icon {
            transform: rotate(180deg);
            position: absolute;
            top: .55rem;
            right: .16rem;
            font-size: .2rem;
            color: $medium-fontColor;
        }
    }
}
</style>

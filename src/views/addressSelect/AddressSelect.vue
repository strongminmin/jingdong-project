<template lang="">
    <div class="wrapper">
        <div class="title">
          地址选择
        </div>
        <div class="empty" v-if="addressList.length === 0">暂无地址信息</div>
        <div class="address" v-if="addressList.length > 0">
          <div
            class="address__item"
            v-for="address in addressList"
            :key="address._id"
            @click="handleAddressClick(address._id)"
          >
            <p class="address__item__basic">
              {{address.name}}
              <span class="address__item__phone">{{address.phone}}</span>
            </p>
            <p class="address__item__address">{{address.city}}{{address.department}}{{address.houseNumber}}</p>
          </div>
        </div>
    </div>
    <Docker :currentIndex = '3'/>
</template>
<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'

const useAddressListEffect = () => {
  const addressList = ref([])
  const getAddressList = async () => {
    const result = await get('/api/user/address')
    if (result?.errno === 0 && result?.data?.length) {
      addressList.value = result.data
    }
  }
  return { addressList, getAddressList }
}

export default {
  name: 'Address',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const { addressList, getAddressList } = useAddressListEffect()
    getAddressList()
    const handleAddressClick = (id) => {
      // console.log(id)
      const path = route.query.path
      router.push(`${path}?addressId=${id}`)
    }
    return { addressList, handleAddressClick }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: $darkBgColor;
  // padding: 0 .18rem .2rem .18rem;
  // background: green;
}

.title {
  position: relative;
  // line-height: .44rem;
  // background: $bgColor;
  // color: $content-fontColor;
  // font-size: .16rem;
  // text-align: center;
  @include title;
}

.address {
  margin: .16rem .18rem 0 .18rem;

  &__item {
    position: relative;
    box-sizing: border-box;
    padding: .18rem .63rem .18rem .16rem;
    margin-bottom: .16rem;
    background: $bgColor;
    border-radius: .04rem;
    line-height: .2rem;
    font-size: .14rem;

    &__basic {
      // line-height: .2rem;
      margin: 0;
      // font-size: .14rem;
      color: $light-fontColor;
    }

    &__phone {
      margin-left: .66rem;
    }

    &__address {
      margin: .08rem 0 0 0;
      color: $content-fontColor;
    }

  }

}

.empty {
  @include empty
}
</style>

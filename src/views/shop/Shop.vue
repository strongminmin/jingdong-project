<template>
    <div class="wrapper">
    <div class="search">
        <div class="search__back iconfont" @click="handleBackClick">&#xe8ef;</div>
        <div class="search__content">
            <span class="search__content__icon iconfont">&#xe6b9;</span>
            <input class="search__content__input" placeholder="请输入商品名称" />
        </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl"/>
    <Content :shopName="item.name"/>
    <Cart />
    </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import ShopInfo from '../../components/ShopInfo.vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import Content from './Content.vue'
import Cart from './Cart.vue'

// 获取当前商铺信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  return { data, getItemData }
}

// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back('Home')
  }
  return { handleBackClick }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    // console.log(route.params, route.name)
    const { data, getItemData } = useShopInfoEffect()
    const { handleBackClick } = useBackRouterEffect()
    getItemData()
    const { item } = toRefs(data)
    return { item, handleBackClick }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper {
    padding: 0 .18rem;
}
.search{
    display: flex;
    margin: .14rem 0 .04rem 0;
    line-height: .32rem;
    &__back{
        width: .3rem;
        font-size: .24rem;
        color: $backIconColor;
    }
    &__content{
        display: flex;
        flex: 1;
        background: $search-bgColor;
        border-radius: .16rem;
        &__icon{
            width: .44rem;
            text-align: center;
            color: $search-fontColor;
        }
        &__input{
            display: block;
            height: .32rem;
            width: 100%;
            padding-right: .2rem;
            border: none;
            outline: none;
            background: none;
            font-size: .14rem;
            color:$content-fontColor;
            &::placeholder{
                color: $content-fontColor;
            }
        }
    }
}
</style>

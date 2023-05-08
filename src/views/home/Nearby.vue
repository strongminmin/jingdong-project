<template>
    <div class="nearby">
        <h3 class="nearby__title">附近店铺</h3>
        <RouterLink
          v-for="item in nearbyList"
          :key="item._id"
          :to="`/shop/${item._id}`">
          <ShopInfo :item="item"/>
        </RouterLink>
    </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearbyList }
}
export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup () {
    // 写死的数据
    // const nearbyList = [
    //   {
    //     id: 1,
    //     imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
    //     title: '沃尔玛',
    //     tags: ['月售1万+', '起送￥0', '基础运费￥5'],
    //     desc: 'VIP尊享满89元减4运费券（每月3张）'
    //   }, {
    //     id: 2,
    //     imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
    //     title: '沃尔玛',
    //     tags: ['月售1万+', '起送￥0', '基础运费￥5'],
    //     desc: 'VIP尊享满89元减4运费券（每月3张）'
    //   }, {
    //     id: 3,
    //     imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
    //     title: '沃尔玛',
    //     tags: ['月售1万+', '起送￥0', '基础运费￥5'],
    //     desc: 'VIP尊享满89元减4运费券（每月3张）'
    //   }, {
    //     id: 4,
    //     imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
    //     title: '沃尔玛',
    //     tags: ['月售1万+', '起送￥0', '基础运费￥5'],
    //     desc: 'VIP尊享满89元减4运费券（每月3张）'
    //   }
    // ]
    // get 动态获取数据
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    getNearbyList()
    return { nearbyList }
  }
}

</script>
<!-- scoped 表示样式只对本组件内的 class 标签有用 -->
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.nearby {
    &__title {
      margin: .16rem 0 .02rem 0;
      font-size: .18rem;
      font-weight: normal;
      color: $content-font-color;
    }
    a {
      text-decoration: none;
    }
  }

</style>

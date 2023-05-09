<template lang="">
    <div class="wrapper">
        <div class="search">
        <div class="search__back iconfont" @click="handleBackClick">&#xe8ef;</div>
        <div class="search__content">
            <span class="search__content__icon iconfont" >&#xe6b9;</span>
            <input
                class="search__content__input"
                placeholder="请输入商品名称"
                v-model="keyword"
                @change="handleSearchInputChange"
            />
        </div>
    </div>
    <RouterLink
          v-for="item in searchList"
          :key="item._id"
          :to="`/shop/${item._id}`">
          <ShopInfo :item="item"/>
        </RouterLink>
    </div>
</template>
<script>
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'

// 点击回退逻辑
const useBackClickEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return handleBackClick
}

// 热词相关逻辑
const useSearchListEffect = () => {
  const searchList = ref([])
  const getSearchList = async (keyword) => {
    const result = await get('/api/shop/search', { keyword })
    if (result?.errno === 0 && result?.data?.length) {
      searchList.value = result.data
    }
  }
  return { searchList, getSearchList }
}
export default {
  name: 'SearchList',
  components: { ShopInfo },
  setup () {
    const route = useRoute()
    // 搜索关键词逻辑
    const keyword = ref(route.query.keyword || '')
    const handleBackClick = useBackClickEffect()
    const handleSearchInputChange = () => {
      getSearchList(keyword.value)
    }
    // 获取搜索列表
    const { searchList, getSearchList } = useSearchListEffect()
    getSearchList(keyword.value)
    return { keyword, searchList, handleBackClick, handleSearchInputChange }
  }

}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrapper {
    padding: 0 .18rem;

    a {
        text-decoration: none;
    }

    .search {
        display: flex;
        margin: .14rem 0 .04rem 0;
        line-height: .32rem;

        &__back {
            width: .3rem;
            font-size: .24rem;
            color: #b6b6b6;
        }

        &__content {
            display: flex;
            flex: 1;
            background: $search-bgColor;
            border-radius: .16rem;

            &__icon {
                width: .44rem;
                text-align: center;
                color: $search-fontColor;
            }

            &__input {
                display: block;
                height: .32rem;
                width: 100%;
                padding-right: .2rem;
                border: none;
                outline: none;
                background: none;
                font-size: .14rem;
                color: $content-font-color;

                &::placeholder {
                    color: $content-font-color;
                }
            }
        }
    }
}
</style>

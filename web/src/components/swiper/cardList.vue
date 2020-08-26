<template>
  <div>
    <div class="card-body pt-3">
      <div class="nav d-fx mt-2 f-xl ai-center jc-around">
        <div
          :class="{ active: navIndex === i }"
          class="nav-item text-dark-1"
          v-for="(item, i) in navs"
          :key="i"
          @click="changeIndex(i)"
        >{{ item }}</div>
      </div>
    </div>
    <div class="mt-3">
      <swiper ref="swiperNav" :options="{ autoHeight: true }">
        <swiper-slide v-for="(article, i) in articles" :key="i">
          <slot name="items" :articles="article"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  data() {
    //这里存放数据
    return {
      navIndex: 0,
    };
  },
  props: {
    articles: { type: Array },
    navs: { type: Array },
  },
  methods: {
    changeIndex(index) {
      this.navIndex = index;
      const swiperNav = this.$refs.swiperNav.swiper;
      swiperNav.slideTo(index, 0, false);
    },
  },
  mounted() {
    const swiperNav = this.$refs.swiperNav.swiper;
    swiperNav.on("slideChange", () => {
      this.navIndex = swiperNav.activeIndex;
    });
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";
.card-body {
  position: relative;
}
</style>

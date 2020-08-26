<!--  -->
<template>
  <div ref="wrapper" class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import PullDown from "@better-scroll/pull-down";
export default {
  name: "Scroll",
  components: {},
  data() {
    //这里存放数据
    return {
      pullDownRefresh: {
        threshold: 80,
        stop: 40,
      },
      scroll: null,
    };
  },
  props: {
    scrollX: {
      type: Boolean,
    },
    pullUpLoad: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: 1,
      pullUpLoad: this.pullUpLoad,
      click: true,
      scrollX: this.scrollX,
      pullDownRefresh: this.pullDownRefresh,
      hasVerticalScroll: true,
    });

    // this.scroll = new BScroll(document.querySelector(".wrapper"), {
    //   // probeType: 3,
    //   // pullUpload: true
    // })
    //2.监听滚动的位置
    this.scroll.on("scroll", (position) => {
      this.scroll.hasVerticalScroll = true;
      this.$emit("scroll", position);
    });
    // this.scroll.on("pullingDown", () => {
    //   setTimeout(() => {
    //     this.scroll.finishPullDown();
    //   }, 2000);
    // });
    if (this.pullDownRefresh != false) {
      this.scroll.on("pullingDown", () => {
        //console.log("shuaxin");
        this.$emit("pullDown");
        // setTimeout(() => {
        //   this.scroll.finishPullDown();
        // }, 2000);
      });
    }
  },
  methods: {
    scrollToTop(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
    finishPullDown() {
      console.log("刷新");
      this.scroll.finishPullDown();
    },
  },
};
</script>
<style scoped>
.pulldown-wrapper {
}
</style>

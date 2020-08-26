<!--  -->
<template>
  <div class="detail">
    <div class="det-header d-fx ai-center">
      <i class="iconfont icon-fanhui-copy back" @click="back()"></i>
      <div>
        <img width="100%" height="30px" src="../assets/img/带我回家.png" alt />
      </div>
      <img width="40px" height="40px" src="../assets/img/lost.svg" alt />
    </div>
    <scroll
      class="deta-scroll"
      @scroll="contScroll"
      @pullDown="loadmore"
      ref="scroll"
      :pull-upLoad="false"
      :scrollX="false"
    >
      <div class="deta-content">
        <div ref="pullDown" class="pulldown-bswrapper f-md">
          <div v-show="beforePullDown">
            <span v-show="!loading">下拉刷新</span>
          </div>
          <div v-show="!beforePullDown">
            <div v-show="isPullingDown">
              <span v-show="!loading">释放刷新</span>
            </div>
          </div>
          <div v-show="loading">
            <span v-show="!isFinish">
              <van-loading type="spinner" size="16" />
            </span>
            <span v-show="isFinish">加载成功</span>
          </div>
        </div>
        <cardList :navs="navs" :articles="articles">
          <template #items="{articles}">
            <router-link
              :to="toArticle(item)"
              tag="div"
              class="p-2 f-lg d-fx art-item ai-center"
              v-for="(item, i) in articles.articles"
              :key="i"
            >
              <span class="tag f-ms mr-2">{{ item.gname }}</span>
              <span class="m-1">&nbsp;&nbsp;</span>
              <span class="text-dark flex-1 text-elipsis pr-2">{{ item.dname }}</span>
              <span class="time text-gray f-md mr-3">{{ item | place }}</span>
              <span class="time text-gray f-md">{{ item | date }}</span>
              <i class="iconfont icon-fanhui-copy back1 text-gray"></i>
            </router-link>
          </template>
        </cardList>
      </div>
    </scroll>
    <div class="footer w-100 bg-blue-2">
      <div class="d-fx h-100 text-center w-100 jc-around ai-center f-xl">
        <div class="f-item" @click="add('lost')">添加挂失</div>
        <div class="f-item" @click="add('found')">添加招领</div>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from "../components/scroll/scroll";
import cardList from "../components/swiper/cardList";
import dayjs from "dayjs";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "datail",
  components: {
    Scroll,
    cardList,
  },
  data() {
    //这里存放数据
    return {
      model: {},
      area: "六区",
      i: 1,
      navIndex: 1,
      saveY: 0,
      beforePullDown: true,
      isPullingDown: false,
      loading: false,
      isFinish: false,
      navs: ["挂失区", "招领区"],
      articles: [
        {
          kind: "lost",
          articles: [],
        },
        {
          kind: "found",
          articles: [],
        },
      ],
    };
  },
  filters: {
    date(val) {
      if (val.lostTime) {
        return dayjs(val.lostTime).format("MM/DD");
      } else {
        return dayjs(val.foundTime).format("MM/DD");
      }
    },
    place(val) {
      if (val.lostPlace) {
        return val.lostPlace;
      } else {
        return val.foundPlace;
      }
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    toArticle(item) {
      if (item.lostTime) {
        return `articles/lost/${item.id}`;
      } else {
        return `articles/found/${item.id}`;
      }
    },
    add(item) {
      this.$router.push(`/add/${item}`);
    },
    contScroll(position) {
      this.$refs.scroll.scroll.hasVerticalScroll = true;
      this.$refs.pullDown.style.marginLeft = -position.x + "px";
      //1.判断Backtop是否显示
      this.beforePullDown = position.y < 80;
      //2.判断tabcontrol是否吸顶
      this.isPullingDown = position.y > 80;
      this.istabshow = -position.y > this.tabOffsetTop;
    },
    loadmore() {
      this.fetch();
      this.isPullingDown = false;
      this.loading = true;
      setTimeout(() => {
        this.isFinish = true;
      }, 700);
      setTimeout(() => {
        this.$refs.scroll.scroll.finishPullDown();
      }, 1500);
      setTimeout(() => {
        this.loading = false;
        this.isFinish = false;
      }, 1600);
    },
    async fetch() {
      const lost = await this.$http.get(
        `rest/areaLost/${this.$route.query.id}`
      );
      const found = await this.$http.get(
        `rest/areaFound/${this.$route.query.id}`
      );
      this.articles[0].articles = lost.data;
      this.articles[1].articles = found.data;
      if (lost.data.length == 0 && found.data.length == 0) {
        this.$toast("该地区没有失物招领哦");
      }
    },
  },
  mounted() {
    //this.$refs.scroll.refresh();
  },
  created() {
    this.fetch();
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    //1.保存y值 x值
    this.saveY = this.$refs.scroll.scroll.y;
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
.tag {
  color: map-get($colors, "pink");
  border: 1px solid map-get($colors, "pink");
  padding: 1px;
  border-radius: 2px;
}

.deta-scroll {
  position: absolute;
  overflow: hidden;
  top: 40px;
  bottom: 40px;
  left: 0;
  right: 0;
  -webkit-overflow-scrolling: touch;
}
.area {
  line-height: 30px;
  color: #fff;
}
.det-header {
  height: 3.0769rem;
  font-size: 1.5385rem;
  // box-shadow: 0px 0px #ccc;
  position: sticky;
  top: 0px;
}
.back {
  color: #989898;
  font-size: 1.3846rem;
  margin-right: 0px;
  position: relative;
}

.nav {
  height: 30px;
}
.art-item {
  height: 50px;
  border-bottom: 1px solid #eee;
}
.art-item:hover {
  border-bottom: 1px solid #eee;
}
.footer {
  position: fixed;
  bottom: 0;
  height: 40px;
}
.f-item {
  width: 50%;
  color: #fff;
  border-right: 1px solid #eee;
}
</style>

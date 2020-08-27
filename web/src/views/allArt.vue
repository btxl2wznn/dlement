<!--  -->
<template>
  <div class="detail">
    <div class="navbar w-100">
      <img class="login" src="../assets/img/dlm.png" alt />
      <div class="search">
        <img src="../assets/img/search.svg" alt />
        <input ref="input" @keyup.13="handleKeyUp" v-model="search1" class="f-md ml-1" type="text" />
      </div>
      <router-link :to="toProfile()" tag="div">
        <img v-show="!isAvatar" class="avatar ml-2" src="../assets/img/头像.svg" alt />
        <img v-show="isAvatar" class="avatar ml-2" :src="avatar" alt />
      </router-link>
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
              @click.native="toArticle(item)"
              to="/"
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
  </div>
</template>

<script>
import Scroll from "../components/scroll/scroll";
import cardList from "../components/swiper/cardList";
import dayjs from "dayjs";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "allArt",
  components: {
    Scroll,
    cardList,
  },
  data() {
    //这里存放数据
    return {
      model: {},
      search1: "",
      area: "六区",
      i: 1,
      navIndex: 1,
      saveY: 0,
      beforePullDown: true,
      isPullingDown: false,
      loading: false,
      isFinish: false,
      avatar: "",
      isAvatar: false,
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
  props: {
    search: "",
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
    click() {
      console.log(111);
    },
    back() {
      this.$router.go(-1);
    },
    toArticle(item) {
      if (item.lostTime) {
        this.$router.push(`articles/lost/${item.id}`);
        //return `articles/lost/${item.id}`;
      } else {
        this.$router.push(`articles/foun/${item.id}`);
        //return `articles/found/${item.id}`;
      }
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
    toProfile() {
      if (localStorage.usertoken) {
        return "/profile";
      } else {
        return "/login";
      }
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
      if (!this.search) {
        const lost = await this.$http.get("rest/allLost");
        const found = await this.$http.get("rest/allFound");
        this.articles[0].articles = lost.data;
        this.articles[1].articles = found.data;
      } else {
        const lost = await this.$http.post(`rest/searchLost/${this.search}`);
        const found = await this.$http.post(`rest/searchFound/${this.search}`);
        this.articles[0].articles = lost.data;
        this.articles[1].articles = found.data;
        if (lost.data.length == 0 && found.data.length == 0) {
          this.$toast("无搜索结果");
        }
      }
    },
    async handleKeyUp() {
      // const lost = await this.$http.post(`rest/searchLost/${this.search1}`);
      // const found = await this.$http.post(`rest/searchFound/${this.search1}`);
      // this.articles[0].articles = lost.data;
      // this.articles[1].articles = found.data;
      // if (lost.data.length == 0 && found.data.length == 0) {
      //   this.$toast("无搜索结果");
      // }
      if (this.search1 == "") {
        this.$toast("请先输入内容");
      } else {
        if (this.$route.path == "/allArt") {
          this.$router.push(`allArt/${this.search1}`);
        } else {
          const lost = await this.$http.post(`rest/searchLost/${this.search1}`);
          const found = await this.$http.post(
            `rest/searchFound/${this.search1}`
          );
          this.articles[0].articles = lost.data;
          this.articles[1].articles = found.data;
          if (lost.data.length == 0 && found.data.length == 0) {
            this.$toast("无搜索结果");
          }
        }
      }
    },
  },
  created() {
    this.fetch();
  },
  activated() {
    if (this.search) {
      this.$refs.input.value = this.search;
    } else {
      this.$refs.input.value = "";
      this.search1 = "";
    }
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      let info = JSON.parse(localStorage.getItem("userInfo"));
      this.avatar = info.avatar;
      this.isAvatar = true;
    }
    //this.search && this.fetch();
    //this.$refs.scroll.refresh();
    this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0);
    //this.model = Object.assign({}, this.model, res.data);
    // this.$set(
    //   this.$refs.scroll.scroll,
    //   "scrollerHeight",
    //   this.$refs.scroll.scroll.scrollerHeight + 1
    // );
    // console.log(this.$refs.scroll.scroll);
    // console.log(this.$refs.scroll.scroll.scrollerHeight);
    // console.log(this.$refs.scroll);
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
  width: 40px;
  text-align: center;
  color: map-get($colors, "pink");
  border: 1px solid map-get($colors, "pink");
  padding: 1px;
  border-radius: 2px;
}

.deta-scroll {
  position: absolute;
  overflow: hidden;
  top: 50px;
  bottom: 50px;
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
  box-shadow: 1px 1px #ccc;
  position: sticky;
  top: 0px;
}
.back1 {
  transform: rotate(180deg);
  color: #666;
  font-size: 1rem;
  margin-left: 1px;
  top: -0.0769rem;
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
  height: 40px;
  position: sticky;
  top: 50px;
}
.f-item {
  width: 50%;
  color: #fff;
  border-right: 1px solid #eee;
}
</style>

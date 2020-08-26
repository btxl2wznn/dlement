<!--  -->
<template>
  <div class="profile pt-1">
    <div class="header pl-1">
      <div class="login d-fx pr-1">
        <div class="flex-1"></div>
        <img width="60px" height="40px" src="../assets/img/dlm.png" alt />
      </div>
      <div class="d-fx ai-center pr-3 pl-2" style="height:50px">
        <img @click="islogin" v-show="!isAvatar" class="avatar" src="../assets/img/头像.svg" alt />
        <img @click="islogin" v-show="isAvatar" class="avatar" :src=" info.avatar" alt />
        <div @click="islogin" class="info ml-2 flex-1">
          <div class="f-xl text-pink">{{!isAvatar ? "请登录" : info.userName}}</div>
          <div class="f-ms text-dark-2 mt-1">学号: {{!isAvatar ? "5201314" : info.userNum}}</div>
        </div>
        <div class="d-fx" @click="editUser">
          <span class="text-gray">编辑</span>
          <i class="iconfont icon-fanhui-copy text-gray edit"></i>
        </div>
      </div>
    </div>
    <div class="content mt-4 pb-3">
      <div class="my">
        <div class="card pt-1 ml-2 mr-3 pb-3 d-fx ai-center">
          <div class="f-xl flex-1">发布的失物招领</div>
          <i class="iconfont icon-lan text-right f-xxl"></i>
        </div>
        <!-- <div class="line"></div> -->
        <div class="d-fx mt-3 text-center ai-center jc-around" style="height: 40px">
          <div :class="{ active: index == 2 }" class="ing bg-blue-2 text-white" @click="ing()">进行中</div>
          <div :class="{ active: index == 1 }" class="end bg-pink text-white" @click="end()">已完成</div>
        </div>
      </div>
      <div class="hint">
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
                  <span class="m-1">&nbsp;</span>
                  <span class="tag">
                    {{
                    index == 1 ? "已完成" : "进行中"
                    }}
                  </span>
                  <span class="m-1">&nbsp;</span>
                  <span class="text-dark flex-1 text-elipsis pr-2">
                    {{
                    item.dname
                    }}
                  </span>
                  <span class="time text-gray f-md mr-3">
                    {{
                    item | place
                    }}
                  </span>
                  <span class="time text-gray f-md">{{ item | date }}</span>
                  <i
                    @click.stop="deleteArt(item)"
                    class="ml-2 f-md iconfont icon-quxiao back text-gray"
                  ></i>
                </router-link>
              </template>
            </cardList>
          </div>
        </scroll>
      </div>
    </div>
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
  name: "profile",
  components: {
    Scroll,
    cardList,
  },
  data() {
    //这里存放数据
    return {
      index: 2,
      saveY: 0,
      beforePullDown: true,
      isPullingDown: false,
      loading: false,
      isFinish: false,
      avatar: "",
      isAvatar: false,
      info: {},
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
      finish: [
        {
          kind: "lost",
          articles: [],
        },
        {
          kind: "found",
          articles: [],
        },
      ],
      Aing: [
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
    deleteArt(item) {
      this.$dialog
        .confirm({
          title: item.gname,
          message: "确定将该物品永久删除吗",
        })
        .then(async () => {
          if (item.lostPlace) {
            const res = await this.$http.delete(`rest/deletelArt/${item.id}`);
            if (res.data.success) {
              this.$toast("删除成功");
              this.fetch();
            }
          } else {
            const res = await this.$http.delete(`rest/deletefArt/${item.id}`);
            if (res.data.success) {
              this.$toast("删除成功");
              this.fetch();
            }
          }
        })
        .catch(() => {
          // on cancel
        });
    },
    islogin() {
      if (this.isAvatar) {
        return false;
      } else {
        this.$router.push("/login");
      }
    },
    toArticle(item) {
      if (this.index == 2) {
        if (item.lostTime) {
          return `editArt/lost/${item.id}`;
        } else {
          return `editArt/found/${item.id}`;
        }
      } else {
        if (item.lostTime) {
          return `editArting/lost/${item.id}`;
        } else {
          return `editArting/found/${item.id}`;
        }
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
    loadmore() {
      //this.fetch();
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
    end() {
      this.index = 1;
      this.articles = this.finish;
    },
    ing() {
      this.index = 2;
      this.articles = this.Aing;
    },
    editUser() {
      this.$router.push("/editUser");
    },
    add(item) {
      this.$router.push(`/add/${item}`);
    },
    async fetch() {
      let id = this.info.id;
      const finishlost = await this.$http.get(`/rest/finishlost/${id}`);
      const finishFound = await this.$http.get(`/rest/finishfound/${id}`);
      const inglost = await this.$http.get(`/rest/inglost/${id}`);
      const ingFound = await this.$http.get(`/rest/ingfound/${id}`);
      this.finish[0].articles = finishlost.data;
      this.finish[1].articles = finishFound.data;
      this.Aing[0].articles = inglost.data;
      this.Aing[1].articles = ingFound.data;
      this.articles = this.Aing;
      this.index = 2;
    },
  },
  created() {
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      let info = JSON.parse(localStorage.getItem("userInfo"));
      this.info = info;
      this.isAvatar = true;
      this.fetch();
    }
  },
  activated() {
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      let info = JSON.parse(localStorage.getItem("userInfo"));
      this.info = info;
      this.isAvatar = true;
      this.fetch();
    }
    this.$refs.scroll.refresh();
    this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    //1.保存y值 x值
    this.saveY = this.$refs.scroll.scroll.y;
  },
};
</script>
<style scoped lang="scss">
@import "../assets/scss/_variables.scss";
.line {
  transform: scale(1, 0.07);
  border-bottom: 1px solid map-get($colors, "black");
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.info {
  line-height: 20px;
  height: 50px;
}
.edit {
  transform: rotate(180deg);
  font-size: 1rem;
  margin-left: 1px;
  top: -0.0769rem;
  position: relative;
}
.mylost {
  border-bottom: 1px solid #eee;
}
.end {
  width: 50%;
  line-height: 40px;
  height: 100%;
  opacity: 0.5;
}
.ing {
  width: 50%;
  line-height: 40px;
  height: 100%;
  opacity: 0.5;
}
.active {
  opacity: 1;
}
.deta-scroll {
  position: absolute;
  overflow: hidden;
  top: 210px;
  bottom: 85px;
  left: 0;
  right: 0;
  -webkit-overflow-scrolling: touch;
}

.det-header {
  height: 3.0769rem;
  font-size: 1.5385rem;
  box-shadow: 1px 1px #ccc;
  position: sticky;
  top: 0px;
}

.nav {
  height: 30px;
}
.tag {
  color: map-get($colors, "pink");
  border: 1px solid map-get($colors, "pink");
  padding: 1px;
  border-radius: 2px;
}
.art-item {
  height: 50px;
  border-bottom: 1px solid #eee;
}
.f-item {
  width: 50%;
  color: #fff;
  border-right: 1px solid #eee;
}
.footer {
  position: fixed;
  color: #fff;
  bottom: 50px;
  height: 35px;
}
</style>

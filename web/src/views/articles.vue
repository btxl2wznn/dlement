<!--  -->
<template>
  <div class="articles">
    <div class="det-header d-fx ai-center">
      <i class="iconfont icon-fanhui-copy back" @click="back()"></i>
      <div>
        <img width="100%" height="30px" src="../assets/img/带我回家.png" alt />
      </div>
      <img width="40px" height="40px" src="../assets/img/lost.svg" alt />
    </div>
    <van-notice-bar left-icon="volume-o" text="丢了么只提供失物招领平台哦！找回物品需自行联系 谨防受骗冒领 祝主人尽快找回宝贝" />
    <van-popup
      class="showUser bg-light p-3"
      position="right"
      :style="{ width: '40%', height: '100%' }"
      v-model="show"
    >
      <div class="userInfo">
        <div class="text-center">
          <img width="80%" height="80%" :src="userInfo.avatar" alt />
          <div class="mt-2 f-xxl text-blue-2">{{userInfo.userName}}</div>
        </div>
        <div class="mt-3 f-lg ml-2 text-dark-2">学号:{{userInfo.userNum}}</div>
        <div class="mt-2 f-lg ml-2 text-dark-2">电话:{{userInfo.userTel}}</div>
        <div class="mt-2 f-lg ml-2 text-dark-2">QQ:{{userInfo.userQQ}}</div>
      </div>
    </van-popup>
    <scroll class="deta-scroll" ref="scroll" :pull-upLoad="false" :scrollX="false">
      <div class="content pt-3 pl-2 pr-2">
        <div class="publisher d-fx ai-center">
          <div>
            <img @click="examine()" class="avatar" :src="userInfo.avatar" alt />
          </div>

          <div class="f-ms ml-1">
            <div @click="examine()" class="name f-lg text-blue-2">{{userInfo.userName}}</div>
            <div class="text-dark-2">
              {{ kind === "lost" ? "丢失时间" : "拾取时间" }} ：{{
              kind === "lost" ? article.lostTime : article.foundTime | date
              }}
            </div>
          </div>
        </div>
        <div class="art f-xl mt-2">
          <div class="mt-2">
            <span class="text-dark-2">{{ kind === "lost" ? "丢失物件" : "拾取物件" }}:</span>
            {{ article.gname }}
          </div>
          <div class="mt-2">
            <span class="text-dark-2">详情:</span>
            {{ article.dname }}
          </div>
          <div class="mt-2 description">
            <span class="text-dark-2">描述:</span>
            {{
            article.description
            }}
          </div>
          <div class="mt-2">
            <span class="text-dark-2">地点:</span>
            {{ kind === "lost" ? article.lostPlace : article.foundPlace }}
          </div>
          <div class="mt-2">
            <span class="text-dark-2">详细地点:</span>
            {{ kind === "lost" ? article.lspecific : article.fspecific }}
          </div>
          <div class="img mt-3">
            <img width="100%" height="100%" :src="article.img" alt />
          </div>
          <div class="mt-2">
            <span class="text-dark-2">发现请联系:</span>
            {{ article.contact }}
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../components/scroll/scroll";
import dayjs from "dayjs";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "articles",
  components: {
    Scroll,
  },
  data() {
    //这里存放数据
    return {
      article: {},
      show: false,
      userInfo: {},
    };
  },
  props: {
    id: "",
    kind: "",
  },
  filters: {
    date(val) {
      //       if (val.lostTime) {
      //     return dayjs(val.lostTime).format("MM/DD");
      //   } else {
      //     return dayjs(val.foundTime).format("MM/DD");
      //   }
      return dayjs(val).format("MM/DD");
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    examine() {
      this.show = true;
    },
    async fetch() {
      let res;
      if (this.kind == "lost") {
        res = await this.$http.get(`rest/getLostArt/${this.id}`);
      } else {
        res = await this.$http.get(`rest/getFoundArt/${this.id}`);
      }
      this.article = res.data[0];
      let user;
      if (this.kind == "lost") {
        user = await this.$http.get(`rest/getUserInfo/${this.article.luserId}`);
      } else {
        user = await this.$http.get(`rest/getUserInfo/${this.article.fuserId}`);
      }
      this.userInfo = user.data[0];
    },
  },
  created() {
    this.fetch();
  },
};
</script>
<style scoped>
.back {
  color: #989898;
  font-size: 1.3846rem;
  margin-right: 0px;
  position: relative;
}
.det-header {
  height: 3.0769rem;
  font-size: 1.5385rem;
  /* box-shadow: 1px 1px #ccc; */
  position: sticky;
  top: 0px;
}
.img {
  width: 15.3846rem;
  height: 15.3846rem;
  overflow: hidden;
  border-radius: 6px;
}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.content {
  line-height: 18px;
}
.description {
  line-height: 24px;
  text-align: justify;
}
.showUser {
}
.userInfo img {
  border-radius: 50%;
}
</style>

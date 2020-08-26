<!--  -->
<template>
  <div class="editUser bg-gray-1 text-dark-1">
    <div class="user-header w-100 d-fx ai-center bg-white text-dark-1">
      <i class="iconfont icon-fanhui-copy back f-xl ml-1" @click="back()"></i>
      <div class="r f-xl ml-3 flex-1">修改头像</div>
      <div @click="save" class="mr-2 f-xl text-gray">保存</div>
    </div>
    <div class="content ml-2 f-xl pl-2 mt-3 d-fx ai-center jc-around">
      <div>
        <van-uploader
          v-model="fileList"
          :before-read="beforeRead"
          :after-read="afterRead"
          multiple
          :max-count="1"
        />
        <!-- <van-image v-if="model.img" width="100" height="100" :src="model.img" /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "editAccount",
  components: {},

  data() {
    //这里存放数据
    return {
      model: {},
      fileList: [],
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async save() {
      if (this.fileList.length < 1) {
        this.$toast("请添加头像");
      } else {
        this.model.id = JSON.parse(localStorage.getItem("userInfo")).id;
        const res = await this.$http.put("/rest/updateAvatar", this.model);
        if (res.data.success) {
          const res = await this.$http.get(`/rest/userInfo/${this.model.id}`);
          let userInfo = res.data[0];
          this.$store.commit("save_userInfo", userInfo);
          this.$toast("修改成功");
          this.$router.go(-1);
        }
      }
    },
    async afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      setTimeout(() => {
        file.status = "successed";
        file.message = "上传成功";
      }, 1000);
      const fromdata = new FormData();
      fromdata.append("file", file.file);
      const imgUrl = await this.$http.post("/upload", fromdata);
      this.$set(this.model, "avatar", imgUrl.data.url);
      this.fileList[0].url = this.model.avatar;
    },
    beforeRead(file) {
      if (file.type !== "image/jpeg") {
        this.$toast("请上传 jpg 格式图片");
        return false;
      }
      return true;
    },
  },
  created() {},
  activated() {},
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";
.editUser {
  height: 100vh;
}
.user-header {
  height: 50px;
  box-shadow: 0px 5px 7px #eee;
}
.input {
  border: none;
  line-height: 30px;
  border-bottom: 2px solid map-get($colors, "pink");
}
</style>

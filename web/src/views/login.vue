<!--  -->
<template>
  <div class="login bg-gray-1 text-dark-1 w-100">
    <div class="user-header w-100 d-fx ai-center bg-white text-dark-1">
      <i class="iconfont icon-fanhui-copy back f-xl ml-1" @click="back()"></i>
      <div class="f-xl ml-3 flex-1">登录注册</div>
      <div @click="change" class="mr-3 f-xl text-gray">{{login ? "注册" : "登录"}}</div>
    </div>
    <div class="loginFrom">
      <div class="mt-3">
        <img height="100px" width="100%" src="../assets/img/login.png" alt />
      </div>
      <div class="loginCont bg-white">
        <van-form v-show="login" @submit="onSubmit">
          <van-field
            v-model="model.userNum"
            name="学号"
            label="学号"
            placeholder="学号"
            :rules="[{ required: true, message: '请填写学号' }]"
          />
          <van-field
            v-model="model.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style=" margin: 16px; ">
            <van-button round block type="info" native-type="submit">登录</van-button>
          </div>
        </van-form>

        <van-form v-show="!login" @submit="onSubmit">
          <van-field
            required
            v-model="model.userNum"
            name="学号"
            label="学号"
            type="digit"
            placeholder="学号"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            required
            v-model="model.userName"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            required
            name="uploader"
            label="头像"
            :rules="[{ required: true, message: '请添加头像' }]"
          >
            <template #input>
              <van-uploader
                v-model="fileList"
                :before-read="beforeRead"
                :after-read="afterRead"
                multiple
                :max-count="1"
              />
              <!-- <van-image v-if="model.img" width="100" height="100" :src="model.img" /> -->
            </template>
          </van-field>
          <van-field
            v-model="model.userTel"
            required
            label="手机号"
            placeholder="请输入手机号"
            :error-message="message"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            required
            v-model="model.userQQ"
            placeholder="QQ"
            type="digit"
            label="QQ"
            :rules="[{ required: true, message: '请填写QQ' }]"
          />
          <van-field
            required
            v-model="model.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="请输入四位及以上密码"
            :error-message="message2"
            :rules="[{ required: true, message: '请输入4位密码' }]"
          />
          <van-field
            required
            v-model="password"
            type="password"
            name="确认密码"
            label="确认密码"
            placeholder="确认密码"
            :error-message="message1"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style=" margin: 16px; ">
            <van-button round block type="info" native-type="submit">{{login ? "登录": "注册"}}</van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      password: "",
      login: true,
      model: {},
      fileList: [],
      message: "",
      message1: "",
      message2: "",
    };
  },
  methods: {
    ...mapActions(["save_userInfo"]),
    async onSubmit(values) {
      if (this.login) {
        const res = await this.$http.post("rest/login", this.model);
        if (res.data.message == "用户不存在或密码错误") {
          this.$toast("用户不存在或密码错误");
        } else {
          this.$toast("登录成功");
          localStorage.usertoken = res.data.token;
          //console.log(res.data.userInfo);
          this.$store.commit("save_userInfo", res.data.userInfo);
          //this.save_userInfo(res.data.userInfo);
          // console.log(JSON.parse(sessionStorage.getItem("userInfo")));
          this.$router.go(-1);
        }
      } else {
        if (this.model.password.length < 4) {
          this.message2 = "请输入四位及以上密码";
        } else {
          if (this.model.password === this.password) {
            var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则 //验证手机号正则
            if (reg.test(this.model.userTel)) {
              const isHave = await this.$http.post("rest/checkNum", this.model);
              if (isHave.data.isHave == false) {
                const res = await this.$http.post("rest/regist", this.model);
                if (res.data.success) {
                  this.$toast("注册成功，请返回登录");
                  this.model = {};
                  this.fileList = [];
                  this.password = "";
                }
              } else {
                this.$toast("该学号已被注册");
              }
            } else {
              this.message = "手机号格式不对";
            }
          } else {
            this.message1 = "密码不一致";
          }
        }
      }
    },
    change() {
      this.login = !this.login;
      this.model = {};
    },
    back() {
      this.$router.go(-1);
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
      this.fileList[0].url = this.model.img;
    },
    beforeRead(file) {
      if (file.type !== "image/jpeg") {
        this.$toast("请上传 jpg 格式图片");
        return false;
      }
      return true;
    },
  },
};
</script>
<style  scoped>
.login {
  height: 100vh;
}
.user-header {
  height: 50px;
  box-shadow: 0px 4px 7px #ddd;
}
.loginCont {
  height: 500px;
}
</style>
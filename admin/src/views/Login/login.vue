<template>
  <div class="login-container">
    <h1 class="titleLog">丢了么后台管理</h1>
    <el-card header="管理员登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input
            v-model="model.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="model.password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-button type="primary" native-type="submit" size="mid"
          >登录</el-button
        >
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      if (
        this.model.username == undefined ||
        this.model.password == undefined ||
        this.model.username == "" ||
        this.model.password == ""
      ) {
        this.$message({
          type: "error",
          message: "请输入完整信息",
        });
      } else {
        let res = await this.$http.post("/login", this.model);
        if (res.data.message == "用户不存在或密码错误") {
          this.$message({
            type: "error",
            message: "用户不存在或密码错误",
          });
        } else {
          localStorage.token = res.data;

          this.$message({
            type: "success",
            message: "登录成功",
          });
          this.$router.push("/");
        }
      }
    },
  },
};
</script>

<style>
.titleLog {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 0px;
  font-size: 50px;
}
.login-container {
  width: 100%;
}
.login-card {
  width: 25rem;
  margin: 100px auto;
}
</style>

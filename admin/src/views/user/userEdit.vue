<template>
  <div class="userEdit">
    <h1>{{ id ? "编辑" : "新建" }}用户</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="学号">
        <el-input
          style="width: 300px;"
          :disabled="id"
          v-model="model.userNum"
          placeholder="必填"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input style="width: 300px;" v-model="model.userName"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="(res) => $set(model, 'avatar', res.url)"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="电话">
        <el-input style="width: 300px;" v-model="model.userTel"></el-input>
      </el-form-item>
      <el-form-item label="QQ">
        <el-input style="width: 300px;" v-model="model.userQQ"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          show-password
          style="width: 300px;"
          v-model="model.password"
          :disabled="id"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input
          show-password
          style="width: 300px;"
          v-model="repassword"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // name: users,
  data() {
    return {
      model: {},
      parents: [],
      repassword: "",
    };
  },
  props: {
    id: {},
  },
  methods: {
    async save() {
      let res;
      console.log(this.model);
      if (
        this.model.userNum == undefined ||
        this.model.userName == undefined ||
        this.model.password == undefined
      ) {
        this.$message({
          type: "error",
          message: "请输入完整的信息",
        });
      } else {
        if (this.id) {
          res = await this.$http.put(`rest/updateUser/${this.id}`, this.model);
        } else {
          if (this.model.password != this.repassword) {
            this.$message({
              type: "error",
              message: "密码不一致",
            });
          } else res = await this.$http.post("rest/saveUser", this.model);
        }
        this.$router.push("/users/list");
        this.$message({
          type: "success",
          message: "保存成功",
        });
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/users/${this.id}`);
      this.model = Object.assign({}, this.model, res.data[0]);
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

<style>
.userEdit {
  width: 50%;
  padding: 20px 40px 0 40px;
}
</style>

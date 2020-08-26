<template>
  <div class="adminEdit">
    <h1>{{ id ? "编辑" : "新建" }}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input style="width: 300px;" v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          show-password
          style="width: 300px;"
          v-model="model.password"
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
  // name: admin_users,
  data() {
    return {
      model: {},
      parents: [],
    };
  },
  props: {
    id: {},
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/updateAdmin/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/saveAdmin", this.model);
      }
      this.$router.push("/admins/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin/${this.id}`, this.model);
      this.model = Object.assign({}, this.model, res.data[0]);
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

<style>
.adminEdit {
  width: 50%;
  padding: 20px 40px 0 40px;
}
</style>

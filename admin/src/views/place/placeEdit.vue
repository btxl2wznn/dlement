<!--  -->
<template>
  <div class="placeEdit">
    <h2>{{ id ? "编辑" : "新建" }}区域</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.category" placeholder="请选择">
          <el-option
            v-for="item in categories"
            :key="item.id"
            :label="item.category"
            :value="item.category"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地名">
        <el-input v-model="model.pname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      model: {},
      categories: [],
    };
  },
  props: {
    id: null,
  },
  methods: {
    async getCategory() {
      const res = await this.$http.get("/rest/pcategory", this.model);
      this.categories = res.data;
    },
    async save() {
      if (this.model.pname == undefined || this.model.category == undefined) {
        this.$message({
          type: "error",
          message: "请输入完整信息",
        });
      } else {
        if (this.id) {
          const res = await this.$http.put(
            `rest/updatePlace/${this.id}`,
            this.model
          );
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        } else {
          const res = await this.$http.post("/rest/savePlace", this.model);
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "保存成功",
            });
          }
        }

        this.$router.push(`/place/list`);
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/place/${this.id}`);
      //this.model = res.data;
      this.model = Object.assign({}, this.model, res.data[0]);
      console.log(this.model);
    },
  },
  created() {
    this.id && this.fetch();
    this.getCategory();
  },
};
</script>
<style scoped>
.placeEdit {
  width: 40%;
  padding: 20px 40px 0;
}
</style>

<!--  -->
<template>
  <div class="foundEdit">
    <h2>{{ id ? "编辑" : "添加" }}招领</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="物品名">
        <el-input v-model="model.gname" placeholder="如手机"></el-input>
      </el-form-item>
      <el-form-item label="详细名">
        <el-input v-model="model.dname" placeholder="如iPhoneX"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="model.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="照片">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="(res) => $set(model, 'img', res.url)"
        >
          <img v-if="model.img" :src="model.img" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="拾取地点">
        <el-select v-model="model.foundPlace" filterable placeholder="必填">
          <el-option
            v-for="item in places"
            :key="item.id"
            :label="item.pname"
            :value="item.pname"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="具体地点">
        <el-input
          v-model="model.fspecific"
          placeholder="不确定 填 不确定"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input
          v-model="model.contact"
          placeholder="QQ 或 Tel 必填"
        ></el-input>
      </el-form-item>
      <el-form-item label="拾取时间">
        <div class="block">
          <el-date-picker
            v-model="model.foundTime"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="是否被领取">
        <el-radio v-model="model.isGive" label="否">否</el-radio>
        <el-radio v-model="model.isGive" label="是">是</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      model: {},
      places: [],
    };
  },
  props: {
    id: null,
  },
  methods: {
    async save() {
      if (
        this.model.gname == undefined ||
        this.model.dname == undefined ||
        this.model.contact == undefined ||
        this.model.foundPlace == undefined
      ) {
        this.$message({
          type: "error",
          message: "请输入完整信息",
        });
      } else {
        if (this.id) {
          this.model.foundTime = dayjs(this.model.foundTime).format(
            "YYYY-MM-DD-HH-MM"
          );
          const res = await this.$http.put(
            `rest/updatefound/${this.id}`,
            this.model
          );
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        } else {
          this.model.fuserId = 1;
          const res = await this.$http.post("/rest/savefound", this.model);
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "保存成功",
            });
          }
        }

        this.$router.push(`/found/list`);
      }
    },
    async getPlaces() {
      const res = await this.$http.get(`rest/placeList`);
      this.places = res.data;
    },
    async fetch() {
      const res = await this.$http.get(`rest/found/${this.id}`);
      //this.model = res.data;
      this.model = Object.assign({}, this.model, res.data[0]);
      this.model.foundTime = dayjs(this.model.foundTime).format(
        "YYYY-MM-DD HH:mm"
      );
    },
  },
  created() {
    this.id && this.fetch();
    this.getPlaces();
  },
};
</script>
<style scoped>
.foundEdit {
  width: 40%;
  padding: 20px 40px 0 40px;
}
</style>

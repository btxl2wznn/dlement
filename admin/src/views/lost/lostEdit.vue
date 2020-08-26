<!--  -->
<template>
  <div class="lostEdit">
    <h2>{{ id ? "编辑" : "添加" }}挂失</h2>
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
      <el-form-item label="丢失地点">
        <el-select v-model="model.lostPlace" filterable placeholder="不确定 填 不确定">
          <el-option v-for="item in places" :key="item.id" :label="item.pname" :value="item.pname"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="具体地点">
        <el-input v-model="model.lspecific" placeholder="不确定 填 不确定"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="model.contact" placeholder="QQ 或 Tel 必填"></el-input>
      </el-form-item>
      <el-form-item label="丢失时间">
        <div class="block">
          <el-date-picker
            v-model="model.lostTime"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="是否找回">
        <el-radio v-model="model.isFind" label="否">否</el-radio>
        <el-radio v-model="model.isFind" label="是">是</el-radio>
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
      console.log(this.model);
      if (
        this.model.gname == undefined ||
        this.model.dname == undefined ||
        this.model.contact == undefined ||
        this.model.lostPlace == undefined
      ) {
        this.$message({
          type: "error",
          message: "请输入完整信息",
        });
      } else {
        if (this.id) {
          this.model.lostTime = dayjs(this.model.lostTime).format("YYYY-MM-DD");
          const res = await this.$http.put(
            `rest/updateLost/${this.id}`,
            this.model
          );
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        } else {
          this.model.luserId = 1;
          const res = await this.$http.post("/rest/saveLost", this.model);
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "保存成功",
            });
          }
        }
        this.$router.push(`/lost/list`);
      }
    },
    async getPlaces() {
      const res = await this.$http.get(`rest/placeList`);
      this.places = res.data;
    },
    async fetch() {
      const res = await this.$http.get(`rest/lost/${this.id}`);
      //this.model = res.data;
      this.model = Object.assign({}, this.model, res.data[0]);
    },
  },
  created() {
    this.id && this.fetch();
    this.getPlaces();
  },
};
</script>
<style>
.lostEdit {
  width: 40%;
  padding: 20px 40px 0 40px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  line-height: 160px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 100px;
  line-height: 130px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

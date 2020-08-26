<!--  -->
<template>
  <div class="editUser bg-gray-1 text-dark-1">
    <div class="user-header w-100 d-fx ai-center bg-white text-dark-1">
      <i class="iconfont icon-fanhui-copy back f-xl ml-1" @click="back()"></i>
      <div class="f-xl ml-3 flex-1">编辑招领</div>
      <!-- <div class="mr-2 f-xl text-gray" @click="cancel()">取消</div> -->
    </div>
    <scroll class="deta-scroll" ref="scroll" :pull-upLoad="false" :scrollX="false">
      <div class="container w-100 mt-4">
        <van-form class="w-100" @submit="onSubmit">
          <van-field
            v-model="model.gname"
            name="物品"
            label="物品名"
            placeholder=" 手机"
            :rules="[{ required: true, message: '请填写物品名' }]"
          />
          <van-field
            v-model="model.dname"
            type="text"
            name="详细名"
            label="详细名"
            placeholder=" iPhone8"
            :rules="[{ required: true, message: '请输入详细名' }]"
          />
          <van-field
            v-model="model.description"
            rows="2"
            autosize
            label="描述"
            type="textarea"
            maxlength="50"
            placeholder="请描述"
            show-word-limit
          />
          <van-field name="uploader" label="原照片">
            <template #input>
              <van-image width="80" height="80" :src="imgUrl" />
              <!-- <van-image v-if="model.img" width="100" height="100" :src="model.img" /> -->
            </template>
          </van-field>
          <van-field name="uploader" label="修改照片">
            <template #input>
              <van-uploader v-model="fileList" :after-read="afterRead" multiple :max-count="1" />
              <!-- <van-image v-if="model.img" width="100" height="100" :src="model.img" /> -->
            </template>
          </van-field>
          <van-field
            readonly
            clickable
            name="area"
            :value="model.foundPlace"
            label="拾取地点"
            placeholder="点击选择"
            @click="showArea = true"
            :rules="[{ required: true, message: '必填' }]"
          />
          <van-popup v-model="showArea" position="bottom">
            <van-picker
              show-toolbar
              title="地点"
              :columns="place"
              @confirm="getPlace"
              @cancel="showPicker = false"
              @change="onChange"
            />
          </van-popup>
          <van-field v-model="model.fspecific" type="text" name="详细地点" label="详细地点" />
          <van-field
            readonly
            clickable
            name="datetimePicker"
            :value="model.foundTime | date"
            label="丢失时间"
            placeholder="点击选择时间"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker type="date" @confirm="onConfirm" @cancel="showPicker = false" />
          </van-popup>
          <van-field
            v-model="model.contact"
            type="digit"
            label="联系方式"
            placeholder="必填 QQ或Tel"
            :rules="[{ required: true, message: 'QQ or Tel' }]"
          />
          <div class="m-4 mb-2">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../../components/scroll/scroll";
import dayjs from "dayjs";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "add",
  components: {
    Scroll,
  },

  data() {
    //这里存放数据
    return {
      model: {
        foundTime: new Date(),
      },
      imgUrl: "",
      fileList: [],
      value: new Date(),
      showPicker: false,
      showArea: false,
      address: [],
      place: [],
    };
  },
  props: {
    id: "",
  },
  filters: {
    date(val) {
      //       if (val.lostTime) {
      //     return dayjs(val.lostTime).format("MM/DD");
      //   } else {
      //     return dayjs(val.foundTime).format("MM/DD");
      //   }
      return dayjs(val).format("YYYY/MM/DD");
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    clean() {
      this.$refs.input.value = "";
    },
    cancel() {
      console.log(this.fileList);
    },
    formatDate(date) {
      return `${date.getYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(time) {
      this.value = time;
      this.showPicker = false;
    },

    onChange(picker, values) {
      picker.setColumnValues(1, this.address[values[0]]);
    },
    getPlace(values) {
      this.model.foundPlace = values.pop();
      this.showArea = false;
    },
    async onSubmit(values) {
      this.model.foundTime = dayjs(this.model.foundTime).format("YYYY-MM-DD");
      this.model.fuserId = JSON.parse(localStorage.getItem("userInfo")).id;
      const res = await this.$http.put(
        `rest/updateFound/${this.model.id}`,
        this.model
      );
      if (res.data.success) {
        this.$toast("修改成功");
        this.$router.go(-1);
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
      //console.log(file.file);
      const imgUrl = await this.$http.post("/upload", fromdata);
      this.$set(this.model, "img", imgUrl.data.url);
      this.fileList[0].url = this.model.img;
    },
    async fetch() {
      const category = await this.$http.get("rest/category");
      const res = await this.$http.get("rest/address");
      const add = [];
      category.data.forEach((a) => {
        let arr = [];
        res.data.forEach((b) => {
          if (b.category == a.category) {
            arr.push(b.pname);
          }
        });
        add[a.category] = new Object(arr);
      });
      this.address = add;
      this.place = [
        { values: Object.keys(this.address) },
        { values: this.address["教学楼"] },
      ];
    },
    async getFound() {
      const found = await this.$http.get(`rest/webGetFound/${this.id}`);
      this.model = found.data[0];
      this.imgUrl = this.model.img;
    },
  },
  created() {
    this.fetch();
    this.getFound();
  },
  activated() {},
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";
.editUser {
  height: 100vh;
  position: relative;
}
.container {
  height: 650px;
}
.user-header {
  height: 50px;
  box-shadow: 0px 3px 10px #ddd;
}
.input {
  border: none;
  line-height: 30px;
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 2px solid map-get($colors, "blue-2");
}
.deta-scroll {
  position: absolute;
  overflow: hidden;
  top: 60px;
  bottom: 0px;
  left: 0;
  right: 0;
  -webkit-overflow-scrolling: touch;
}
</style>

<!--  -->
<template>
  <div class="placeList">
    <h2>挂失列表</h2>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.gname.toLowerCase().includes(search.toLowerCase()) ||
            data.dname.toLowerCase().includes(search.toLowerCase()) ||
            data.lostPlace.toLowerCase().includes(search.toLowerCase())
        )
      "
      stripe
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="物品名">
              <span>{{ props.row.gname }}</span>
            </el-form-item>
            <el-form-item label="详细名">
              <span>{{ props.row.dname }}</span>
            </el-form-item>
            <el-form-item label="物品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="用户 ID">
              <span>{{ props.row.luserId }}</span>
            </el-form-item>
            <el-form-item label="描述">
              <span>{{ props.row.description }}</span>
            </el-form-item>

            <el-form-item label="联系方式">
              <span>{{ props.row.contact }}</span>
            </el-form-item>
            <el-form-item label="丢失地点">
              <span>{{ props.row.lostPlace }}</span>
            </el-form-item>
            <el-form-item label="具体地点">
              <span>{{ props.row.lspecific }}</span>
            </el-form-item>
            <el-form-item label="丢失时间">
              <span>{{ props.row.lostTime | date }}</span>
            </el-form-item>
            <el-form-item label="是否找回">
              <span>{{ props.row.isFind }}</span>
            </el-form-item>
            <el-form-item label="照片">
              <div class="demo-image__preview">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="props.row.img"
                  :preview-src-list="props.row.img | enlarge"
                >
                </el-image>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="luserId" label="用户ID"></el-table-column>
      <el-table-column prop="gname" label="物品名"></el-table-column>
      <el-table-column prop="dname" label="详细名"></el-table-column>
      <el-table-column prop="lostTime" sortable label="丢失时间">
        <template slot-scope="scope">
          <span>{{ scope.row.lostTime | date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="lostPlace" label="丢失地点"></el-table-column>
      <el-table-column prop="contact" label="联系方式"></el-table-column>
      <el-table-column
        prop="isFind"
        :filters="[
          { text: '是', value: '是' },
          { text: '否', value: '否' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        label="是否找回"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot="header" slot-scope="scope">
          <el-input
            style="margin-left: -10px"
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/lost/edit/${scope.row.id}`)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
      tableData: [],
      search: "",
    };
  },
  filters: {
    date(val) {
      return dayjs(val).format("YYYY/MM/DD");
    },
    enlarge(url) {
      let arr = new Array();
      arr[0] = url;
      return arr;
    },
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/rest/lostList");
      this.tableData = res.data;
    },
    remove(row) {
      this.$confirm(`此操作将永久删除挂失的${row.dname}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$http.delete(`rest/deleteLost/${row.id}`);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    filterTag(value, row) {
      return row.isFind === value;
    },
  },
  created() {
    this.fetch();
  },
};
</script>
<style scoped>
.placeList {
  width: 90%;
  padding: 20px 40px 0 40px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

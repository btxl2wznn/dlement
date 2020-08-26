<!--  -->
<template>
  <div class="placeList">
    <h2>区域列表</h2>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="pname" label="地名"></el-table-column>
      <el-table-column
        prop="category"
        :filters="[
          { text: '教学楼', value: '教学楼' },
          { text: '宿舍', value: '宿舍' },
          { text: '食堂', value: '食堂' },
          { text: '运动场', value: '运动场' },
          { text: '湖园', value: '湖园' },
          { text: '其他', value: '其他' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        label="所属区域"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/place/edit/${scope.row.id}`)"
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
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tableData: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/rest/placeList");
      this.tableData = res.data;
    },
    remove(row) {
      this.$confirm(`此操作将永久删除${row.pname}地点, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$http.delete(`rest/deletePlace/${row.id}`);
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
      return row.category === value;
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
</style>

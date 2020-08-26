<template>
  <div class="userList">
    <h1>用户列表</h1>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.userName.toLowerCase().includes(search.toLowerCase()) ||
            data.userNum.toLowerCase().includes(search.toLowerCase())
        )
      "
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="userNum" label="学号"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="userTel" label="Tel"></el-table-column>
      <el-table-column prop="userQQ" label="QQ"></el-table-column>
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
            @click="$router.push(`/users/edit/${scope.row.id}`)"
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
  name: "categroyList",
  data() {
    return {
      tableData: [],
      search: "",
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/usersList");
      this.tableData = res.data;
    },
    async remove(row) {
      this.$confirm(`此操作将永久删除用户${row.username}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$http.delete(`rest/deleteUser/${row.id}`);
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
  },
  created() {
    this.fetch();
  },
};
</script>

<style scoped>
.userList {
  width: 90%;
  padding: 20px 40px 0 40px;
}
</style>

<template>
  <div class="adminList">
    <h1>管理员列表</h1>
    <el-table :data="items">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/admins/edit/${scope.row.id}`)"
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
      items: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/adminList");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`此操作将永久删除管理员${row.name}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$http.delete(`rest/deleteAdmin/${row.id}`);
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
.adminList {
  width: 90%;
  padding: 20px 40px 0 40px;
}
</style>

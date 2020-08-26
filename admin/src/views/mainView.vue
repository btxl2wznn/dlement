<template>
  <div class="mainView">
    <el-container style="height: 100vh; ">
      <el-header>
        <div class="title">
          <i class="el-icon-menu"></i>丢了么后台管理系统
        </div>
        <div class="admin">
          <el-dropdown>
            <i class="el-icon-setting"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logOut()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>你好 {{admin}}</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router :default-openeds="arr" unique-opened :default-active="$route.path">
            <el-submenu index="1">
              <template slot="title">
                <div class="menu-item">
                  <i class="el-icon-location-outline"></i>
                  <span>区域管理</span>
                </div>
              </template>
              <el-menu-item-group>
                <template slot="title">添加区域</template>
                <el-menu-item index="/place/create">添加区域</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">区域列表</template>
                <el-menu-item index="/place/list">区域列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <div class="menu-item">
                  <i class="el-icon-shopping-bag-2"></i>
                  <span>物品管理</span>
                </div>
              </template>
              <el-menu-item-group>
                <template slot="title">挂失物品</template>
                <el-menu-item index="/lost/create">添加挂失</el-menu-item>
                <el-menu-item index="/lost/list">挂失列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">招领物品</template>
                <el-menu-item index="/found/create">添加招领</el-menu-item>
                <el-menu-item index="/found/list">招领列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <div class="menu-item">
                  <i class="el-icon-user"></i>
                  <span>人员管理</span>
                </div>
              </template>
              <el-menu-item-group>
                <template slot="title">用户</template>
                <el-menu-item index="/users/create">新建用户</el-menu-item>
                <el-menu-item index="/users/list">用户列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">管理员</template>
                <el-menu-item index="/admins/create">新建管理员</el-menu-item>
                <el-menu-item index="/admins/list">管理员列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <router-view :key="$route.path"></router-view>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "mianView",
  data() {
    return {
      arr: [],
      admin: "唐琪",
    };
  },
  components: {},
  methods: {
    async getadmin() {
      let res = await this.$http.get(`rest/getAdmin/${localStorage.token}`);
      this.admin = res.data[0].name;
    },
    logOut() {
      localStorage.clear();
      this.$router.push("/login");
      this.$message({
        type: "success",
        message: "退出成功",
      });
    },
  },
  created() {
    this.getadmin();
  },
};
</script>

<style scoped>
.el-header {
  background-color: #212121;
  color: #333;
  display: flex;
  align-items: center;
}

.el-aside {
  background-color: #212121;
  color: #333;
  border-top: 1px solid #5f6368;
}

.el-main {
  background-color: #fff;
  color: #333;
}

body > .el-container {
  widows: 100%;
  margin: 80px 40px 0 40px;
}
.el-menu {
  background-color: #212121;
  color: #fff;
  font-size: 17px;
}
.menu-item,
.menu-item > i {
  color: #fff;
  font-size: 18px;
}
.menu-item:hover i {
  color: #000;
}
.menu-item:hover {
  color: #000;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.title {
  font-size: 25px;
  color: #fff;
  flex: 1;
}
.admin,
.admin > .el-dropdown {
  font-size: 18px;
  color: #fff;
}
</style>

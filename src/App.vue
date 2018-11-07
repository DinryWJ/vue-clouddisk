<template>
  <div>
    <el-container >
      <el-header class="navbar">
        <!-- 导航栏 -->
        <el-row>
          
            <el-menu 
            router
            :default-active="$route.path"
            class="el-menu-demo" mode="horizontal">
            <el-col :span="1">
            <el-menu-item index="/">
              <i class="far fa-copy fa-lg"></i>
              <span>网盘</span>
            </el-menu-item>
            </el-col>
            <el-col :span="1">
            <el-menu-item index="/share">
              <i class="fas fa-link fa-lg"></i>
              <span>分享</span>
            </el-menu-item>
            </el-col>
            <el-col :span="1">
            <el-menu-item index="/explore">
              <i class="far fa-trash-alt fa-lg"></i>
              <span>找资源</span>
            </el-menu-item>
            </el-col>
            <el-col :span="1">
            <el-menu-item index="/more" id="buttom">
              <i class="fas fa-info"></i>
              <span>更多</span>
            </el-menu-item>
            </el-col>
            </el-menu>
          
          <el-col :span="2" :offset="20"><div class="grid-content">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                管理员<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">设置</el-dropdown-item>
                <el-dropdown-item command="b">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div></el-col>
        </el-row>
      </el-header>
    <router-view></router-view>
    </el-container>
  </div>
</template>
<script>
import axion from "@/utils/http_url.js"; //接口文件
export default {
  data() {
    return {
      
    };
  },
  mounted() {
  },
  methods: {
    handleCommand(command) {}
  }
};
</script>

<style scoped>
.navbar{
  background-color: #eff4f8;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-dropdown-link {
  line-height: 60px;
  cursor: pointer;
  color: #ffffff;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

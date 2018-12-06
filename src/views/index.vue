<template>
  <div>
    <el-container >
      <el-header class="navbar">
        <img :src="icon" style="height:100%;float: left;margin-left:20px;"/>
        <!-- 导航栏 -->
            <el-menu 
            router
            :default-active="$route.path"
            class="el-menu-demo"
            active-text-color="#3b8cff"
            text-color="#000"
            mode="horizontal">

            <el-menu-item index="/disk/home" class="menu-item hidden-sm-and-down">
              <span>网盘</span>
            </el-menu-item>
            <el-menu-item index="/share" class="menu-item hidden-sm-and-down">
              <span>分享</span>
            </el-menu-item>
            <el-menu-item index="/explore" class="menu-item hidden-sm-and-down">
              <span>找资源</span>
            </el-menu-item>
            <el-menu-item index="/more" id="buttom" class="menu-item hidden-sm-and-down">
              <span>更多</span>
            </el-menu-item>
            <el-submenu index="" style="float:right;" class="menu-item">
              <template slot="title">我的工作台</template>
              <el-menu-item index="/2-1">选项1</el-menu-item>
              <el-menu-item index="/2-2">选项2</el-menu-item>
            </el-submenu>
            </el-menu>
      </el-header>
    <router-view></router-view>
    </el-container>
  </div>
</template>
<script>
import axion from "@/utils/http_url.js"; //接口文件
import logo from "@/assets/logo.png";
export default {
  data() {
    return {
      icon: logo
    };
  },
  mounted() {
    document.oncontextmenu = function(){
    　　return false;
    }
  },
  methods: {
    handleCommand(command) {}
  }
};
</script>

<style scoped>
.navbar {
  /* background-color: #eff4f8; */
  padding: 0;
}
.el-menu-demo {
  margin-left: 250px;
  /* background-color: #eff4f8; */
}
.menu-item {
  font-size: 16px;
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
.el-dropdown-link {
  line-height: 60px;
  cursor: pointer;
}
.el-dropdown {
  float: right;
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

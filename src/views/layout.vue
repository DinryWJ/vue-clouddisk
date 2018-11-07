<template>
  <div id="app">
    <!-- 其他页 -->
    <el-container >
      <el-header class="navbar">
        <!-- 导航栏 -->
        <el-row>
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
    <el-container>
      <el-aside width="200px" class="sidebar">
        <!-- 侧边栏 -->
        <el-row class="tac"> 
          <el-col>
          <el-menu 
            router
            :default-active="$route.path"
            class="el-menu-vertical-demo">
            <el-menu-item index="/">
              <i class="far fa-copy fa-lg" style="margin-right: 10px;"></i>
              <span>全部文件</span>
            </el-menu-item>
            <el-menu-item index="/">
              <i class="fas fa-link fa-lg" style="margin-right: 6px;"></i>
              <span>我的分享</span>
            </el-menu-item>
            <el-menu-item index="/">
              <i class="far fa-trash-alt fa-lg" style="margin-right: 10px;"></i>
              <span>回收站</span>
            </el-menu-item>
            <el-menu-item index="/" id="buttom">
              <i class="far fa-trash-alt fa-lg" style="margin-right: 10px;"></i>
              <span>关于我们</span>
            </el-menu-item>
          </el-menu>
          <div id="supplement"></div>
        </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <!-- Body -->
         <router-view></router-view>
      </el-main>
    </el-container>
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
    this.init();
  },
  methods: {
    init(){
      // axion.getUserByToken({
      //   token:this.$cookieStore.getCookie("token")
      // }).then(d => {
      //     if (d.data.code != 200) {
      //       this.$alert(d.data.type, "提示", {});
      //       return;
      //     }
      //     if(d.data.data.userPermission != "1"){
      //       this.$alert("非管理员！", "提示", {});
      //       this.$router.push('/');
      //     }
      //   });
    },
    handleCommand(command) {
      // if(command == 'b'){
      //   this.$router.push('/');
      // }
    }
  }
};
</script>
 
<style scoped>
#buttom{
  left: 0;
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 100;

}
#supplement{
  background-color: #eff4f8;
  height: 500px;
}
.navbar,.sidebar {
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
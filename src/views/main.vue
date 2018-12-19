<template>
  <div id="app">
    <el-container>
      <el-aside width="200px" id="sidebar">
        <!-- 侧边栏 -->
        <el-row> 
          <el-col>
          <el-menu 
            router
            :default-active="$route.path"
            class="el-menu-vertical-demo">
            <el-menu-item index="/disk/home">
              <i class="far fa-copy fa-lg" style="margin-right: 10px;"></i>
              <span>全部文件</span>
            </el-menu-item>
            <el-menu-item index="/disk/myshare">
              <i class="fas fa-link fa-lg" style="margin-right: 6px;"></i>
              <span>我的分享</span>
            </el-menu-item>
            <el-menu-item index="/disk/recyclebin">
              <i class="far fa-trash-alt fa-lg" style="margin-right: 10px;"></i>
              <span>回收站</span>
            </el-menu-item>
            <el-menu-item index="/disk/about" id="buttom">
              <i class="fas fa-info" style="margin-right: 10px;"></i>
              <span>关于我们</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        </el-row>
      </el-aside>
      <el-main  style="border:1px solid #e4e4e4;margin-left:-1px;">
        <!-- Body -->
         <router-view></router-view>
      </el-main>
    </el-container>
   </div>
</template>
 
<script>
import axion from "@/utils/http_url.js"; //接口文件
export default {
  data() {
    return {
      screenHeight: document.documentElement.clientHeight - 60 //减去header的60px
    };
  },
  mounted() {
    document.getElementById("sidebar").style.height = this.screenHeight + "px"; //页面初始化
    document.getElementById("app").style.height = this.screenHeight + "px";
    window.onresize = () => {
      return (() => {
        this.screenHeight = document.documentElement.clientHeight;
      })();
    };
  },
  methods: {

  },
  watch: {
    screenHeight(val) {
      this.screenHeight = val;
      document.getElementById("sidebar").style.height =
        this.screenHeight - 60 + "px"; //检测窗口的大小，并赋值
    }
  }
};
</script>
 
<style scoped>
#app{
  overflow: hidden;
}
#buttom {
  position: fixed;
  bottom: 0;
  width: 200px;
  z-index: 100;
}
.el-menu-item:hover {
  background-color: #e3e8eb;
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
<template>
  <div>
    <v-contextmenu ref="contextmenu" :theme="theme" @show="show" @hide="hide">
      <v-contextmenu-item @click="handleClick" :disabled="multiDisabled">打开</v-contextmenu-item>
      <v-contextmenu-item @click="handleClick">下载</v-contextmenu-item>

      <v-contextmenu-item divider></v-contextmenu-item>

      <v-contextmenu-item @click="handleClick">分享</v-contextmenu-item>
      <v-contextmenu-item @click="handleClick">设置共享</v-contextmenu-item>

      <v-contextmenu-item divider></v-contextmenu-item>

      <v-contextmenu-item @click="handleClick">移动到...</v-contextmenu-item>
      <v-contextmenu-item @click="handleClick">复制到...</v-contextmenu-item>

      <v-contextmenu-item divider></v-contextmenu-item>

      <v-contextmenu-item @click="handleClick" :disabled="multiDisabled">重命名</v-contextmenu-item>
      <v-contextmenu-item @click="handleClick">删除</v-contextmenu-item>
    </v-contextmenu>


    <div class="nav">
      <button id="uploadBtn" class="button button-primary button-raised button-glow button-longshadow-right" v-on:click="uploadshow=true">
        <i class="fas fa-upload"></i>上传
      </button>
      <button class="button button-rounded"><i class="fas fa-folder-plus"></i>新建文件夹</button>
      <button id="sort" class="button button-large button-plain button-borderless"><i class="fas fa-sort-amount-down"></i></button>
      <el-input
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        v-model="input">
      </el-input>
    </div>

    <div class="body">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>

      <el-table
        v-contextmenu:contextmenu
        :height="tableHeight"
        :data="tableData"
        ref="multipleTable"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @row-contextmenu="clickTd"
        @header-contextmenu="clickTh">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="文件"
          min-width="500">
          <template slot-scope="scope">
            <i class="fas fa-folder fa-2x"></i>
            <span style="margin-left:20px;">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="大小"
          width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.size }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="修改时间"
          width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <transition name="fade">
    <div class="uploadField" v-show="uploadshow">
      <el-card class="box-card" body-style="padding: 0">
        <div slot="header" class="clearfix">
          <span>上传</span>
          <el-button style="float: right; padding: 5px 0" type="text" @click="closeUpload"><i class="fas fa-times"></i></el-button>
          <el-button style="float: right; padding: 5px 0;margin-right:5px;" type="text"  @click="minimize"><i class="far fa-window-minimize" v-if="mini"></i><i v-else class="far fa-window-maximize"></i></el-button>
        </div>
        <div>
          <uploader :options="options" class="uploader-example" ref="uploader">
            <uploader-unsupport></uploader-unsupport>
            <uploader-drop>
              <div style="padding:5px 0">拖动上传到此处...</div>
              <uploader-btn>选择文件</uploader-btn>
              <uploader-btn :attrs="attrs">选择图片</uploader-btn>
              <uploader-btn :directory="true">选择文件夹</uploader-btn>
            </uploader-drop>
            <uploader-list></uploader-list>
          </uploader>
        </div>
      </el-card>
    </div>
    </transition>
  </div>
</template>
<script>
import axion from "@/utils/http_url.js"; //接口文件
export default {
  data() {
    return {
      mini: true,
      uploadshow: false,
      menuShow: false,
      tableHeight: window.innerHeight - 180,
      input: "",
      multiDisabled: true,
      options: {
        target: "http://localhost:12315/upload",
        testChunks: true
      },
      attrs: {
        accept: "image/*"
      },
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "文件夹3",
          size: "-"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "文件夹2",
          size: "-"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "文件夹1",
          size: "-"
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "图片.jpg",
          size: "100KB"
        },
        {
          id: 5,
          date: "2016-05-04",
          name: "压缩包.zip",
          size: "100.16M"
        },
        {
          id: 6,
          date: "2016-05-01",
          name: "深入理解java.pdf",
          size: "100.16M"
        },
        {
          id: 7,
          date: "2016-05-03",
          name: "音乐.mp3",
          size: "100.16M"
        },
        {
          id: 8,
          date: "2016-05-04",
          name: "大学物理.ppt",
          size: "100.16M"
        },
        {
          id: 9,
          date: "2016-05-01",
          name: "catalina.out",
          size: "100.16M"
        },
        {
          id: 10,
          date: "2016-05-03",
          name: "图片.jpg",
          size: "100.16M"
        },
        {
          id: 11,
          date: "2016-05-04",
          name: "未知格式.12",
          size: "100.16M"
        },
        {
          id: 12,
          date: "2016-05-01",
          name: "视频.mp4",
          size: "100.16M"
        },
        {
          id: 13,
          date: "2016-05-03",
          name: "电影.avi",
          size: "100.16M"
        },
        {
          id: 14,
          date: "2016-05-03",
          name: "电影.avi",
          size: "100.16M"
        },
        {
          id: 15,
          date: "2016-05-04",
          name: "可执行文件.exe",
          size: "100.16M"
        },
        {
          id: 16,
          date: "2016-05-01",
          name: "压缩包.zip",
          size: "100.16M"
        },
        {
          id: 17,
          date: "2016-05-03",
          name: "压缩包.rar",
          size: "100.16M"
        },
        {
          id: 18,
          date: "2016-05-04",
          name: "可执行文件.exe",
          size: "100.16M"
        }
      ],
      multipleSelection: []
    };
  },
  mounted() {
   
    this.init();
  },
  props: {
    theme: String
  },
  methods: {
    init(){
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      let _this = this;
      let uploaderInstance = this.$refs.uploader.uploader;
      uploaderInstance.on('complete', function () {
        console.log(uploaderInstance.fileList);
        _this.$message({
          message: '所有文件上传成功！',
          type: 'success'
        });
      })
    },
    handleCommand(command) {},
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    toggleSelection(row) {
      let flag = false;
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].id == row["id"]) {
          flag = true;
          break;
        }
      }
      this.multiDisabled = false;
      if (!flag) {
        this.$refs.multipleTable.clearSelection();
      } else {
        if (this.multipleSelection.length > 1) {
          this.multiDisabled = true;
        }
      }
      if (row) {
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    clickTd(row, event) {
      console.log(row["id"]); //跟下面效果一样
      this.toggleSelection(row);
      // console.log(row, event); //获取各行id的值
    },
    clickTh(row, event) {
      window.event ? (window.event.cancelBubble = true) : e.stopPropagation(); //阻止表头触发右键菜单栏
    },
    handleClick(vm, event) {
      console.log(vm, event);
    },
    handleSelectionChange(val) {
      if (this.menuShow) {
        this.$refs.contextmenu.hide();
      }
      this.multipleSelection = val;
    },
    show() {
      console.log("menu show");
      this.menuShow = true;
    },
    hide() {
      console.log("menu hide");
      this.menuShow = false;
    },
    minimize() {
      this.mini = !this.mini;
      if (this.mini) {
        document.getElementsByClassName("uploadField")[0].style.bottom = "0px";
      } else {
        document.getElementsByClassName("uploadField")[0].style.bottom =
          "-445px";
      }
    },
    closeUpload(){
      // let uploaderInstance = this.$refs.uploader.uploader;
      // if(!uploaderInstance.isComplete()){
      //   this.$confirm('上传未完成，是否取消上传?', '提示', {
      //     confirmButtonText: '是',
      //     cancelButtonText: '否',
      //     type: 'warning'
      //   }).then(() => {
      //     uploaderInstance.cancel();
      //     this.uploadshow = false;
      //   }).catch(() => {});
      // }else{
        this.uploadshow = false;
      // }
    }
  }
};
</script>

<style scoped>
.button {
  padding: 0 24px;
  margin-right: 10px;
}
.el-input {
  float: right;
  width: 200px;
}
#sort {
  float: right;
  color: #000;
}
.body {
  margin-top: 20px;
}
.uploadField {
  background-color: blueviolet;
  width: 614px;
  height: 500px;
  position: absolute;
  right: 50px;
  bottom: 0px;
  z-index: 20;
}
.uploader-example {
  font-size: 12px;
  min-height: 445px;
  max-height: 445px;
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 374px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
/* 开始过渡阶段,动画出去阶段 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}
/* 进入开始 */
.fade-enter {
  transform: translateY(500px);
  opacity: 0;
}
/* 出去终点 */
.fade-leave-active {
  transform: translateY(500px);
  opacity: 0;
}
</style>

<template>
  <div>
    <v-contextmenu ref="contextmenu" :theme="theme" @show="show" @hide="hide" style="width:150px">
      <div v-show="menuType">
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
      </div>
      <div v-show="!menuType">
        <v-contextmenu-item ><i class="fas fa-plus"></i><span style="margin-left:10px;">文件夹</span></v-contextmenu-item>
        <v-contextmenu-item divider></v-contextmenu-item>
        <v-contextmenu-item id="click-upload-file"><i class="fas fa-file-upload"></i><span style="margin-left:10px;">上传文件</span></v-contextmenu-item>
        <v-contextmenu-item id="click-upload-folder"><i class="fas fa-folder-plus"></i><span style="margin-left:7px;">上传文件夹</span></v-contextmenu-item>
      </div>
    </v-contextmenu>

    <div class="nav">
      <el-popover placement="bottom" width="300" trigger="hover">
        <div class="uploaditem">
          <i class="fas fa-plus"></i>
          <span style="margin-left:10px;">文件夹</span>
        </div>
        <hr style="border:1 dashed" color="#f0f1f3" size="1">
        <div class="uploaditem" id="upload-file">
          <i class="fas fa-file-upload"></i>
          <span style="margin-left:10px;">上传文件</span>
        </div>
        <div class="uploaditem" id="upload-folder">
          <i class="fas fa-folder-plus"></i>
          <span style="margin-left:7px;">上传文件夹</span>
        </div>
        <el-button type="primary" icon="fas fa-plus" slot="reference"> 新建</el-button>
      </el-popover>
      <el-button id="sort">
        <i class="fas fa-sort-amount-down"></i>
      </el-button>
      <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="input"></el-input>
    </div>

    <div class="body">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="bread in breadList" v-bind:key="bread.id">
          <el-button type="text" @click="backFolder(bread.id)">{{bread.name}}</el-button>
        </el-breadcrumb-item>
      </el-breadcrumb>

      <el-table
        v-contextmenu:contextmenu
        :max-height="tableHeight"
        :data="tableData"
        ref="multipleTable"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @row-contextmenu="clickTd"
        @header-contextmenu="clickTh"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="文件" min-width="500">
          <template slot-scope="scope">
            <div>
              <div v-if="scope.row.isFolder" class="folderType"></div>
              <div style="width:18px;height: 24px;" v-else :class="scope.row.fileType"></div>
            </div>
            <span
              class="folder"
              v-if="scope.row.isFolder"
              style="margin-left:10px;"
              @click="openFolder(scope.$index,scope.row.id)"
            >{{ scope.row.name }}</span>
            <span class="file" v-else style="margin-left:10px;">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="大小" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.size }}</span>
          </template>
        </el-table-column>
        <el-table-column label="修改时间" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="uploadField" v-show="uploadshow">
      <el-card class="box-card" body-style="padding: 0;">
        <div slot="header" class="clearfix">
          <span>上传</span>
          <el-button style="float: right; padding: 5px 0" type="text" @click="uploadshow = false;">
            <i class="fas fa-times"></i>
          </el-button>
          <el-button
            style="float: right; padding: 5px 0;margin-right:5px;"
            type="text"
            @click="minimize"
          >
            <i class="far fa-window-minimize" v-if="mini"></i>
            <i v-else class="far fa-window-maximize"></i>
          </el-button>
        </div>
        <div v-show="uploadMain">
          <uploader :options="options" class="uploader-example" ref="uploader">
            <uploader-unsupport></uploader-unsupport>
            <uploader-list></uploader-list>
          </uploader>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import axion from "@/utils/http_url.js"; //接口文件
import { fileMd5HeadTailTime } from "../../utils/md5.js";
export default {
  data() {
    return {
      mini: true,
      uploadshow: false,
      uploadMain: true,
      menuShow: false,
      menuType: false,
      tableHeight: window.innerHeight - 180,
      input: "",
      multiDisabled: true,
      rootPath: "/",
      options: {},
      attrs: {
        accept: "image/*"
      },
      breadList: [],
      tableData: [],
      multipleSelection: []
    };
  },
  created() {
    this.getOption(this);
  },
  mounted() {
    this.init();
  },
  props: {
    theme: String
  },
  methods: {
    getOption(_this) {
      _this.options = {
        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
        target: "http://localhost:12315/upload",
        testChunks: true,
        chunkSize: 64 * 1024 * 1024,
        preprocess: _this.preprocess,
        simultaneousUploads: 1,
        query: function(file) {
          return { md5: file.md5 };
        },
        headers: {
          Authorization: localStorage.getItem("token")
        },
        checkChunkUploadedByResponse: function(chunk, message) {
          var objMessage = {};
          try {
            objMessage = JSON.parse(message);
          } catch (e) {}
          return (
            (objMessage.returnData.chunks || []).indexOf(chunk.offset + 1) >= 0
          );
        }
      };
    },
    init() {
      let _this = this;
      let uploaderInstance = this.$refs.uploader.uploader;
      uploaderInstance.on("fileSuccess", this.saveFileToContent);
      uploaderInstance.on("fileAdded", function(file, event) {
        axion.validAuth().then(d => {
          _this.uploadshow = true;
          _this.uploadMain = true;
          return true;
        });
      });
      uploaderInstance.assignBrowse(
        document.getElementById("upload-file"),
        false,
        false,
        {}
      );
      uploaderInstance.assignBrowse(
        document.getElementById("upload-folder"),
        true,
        true,
        {}
      );
      uploaderInstance.assignBrowse(
        document.getElementById("click-upload-file"),
        false,
        false,
        {}
      );
      uploaderInstance.assignBrowse(
        document.getElementById("click-upload-folder"),
        true,
        true,
        {}
      );
      this.getContent(0);
      let bread = {};
      bread.id = 0;
      bread.name = "首页";
      this.breadList.push(bread);
    },
    getContent(val) {
      this.tableData = new Array();
      let _this = this;
      axion.getContent(val).then(d => {
        if (d.data.returnCode != 200) {
          _this.$message(d.data.returnData);
        }
        for (let i = 0; i < d.data.returnData.contents.length; i++) {
          let temp = {};
          temp.id = d.data.returnData.contents[i].id;
          temp.name = d.data.returnData.contents[i].name;
          temp.date = d.data.returnData.contents[i].updateTime;
          temp.size = "-";
          temp.fileType = "folder";
          temp.isFolder = true;
          _this.tableData.push(temp);
        }
        for (let i = 0; i < d.data.returnData.files.length; i++) {
          let temp = {};
          temp.id = d.data.returnData.files[i].id;
          temp.name = d.data.returnData.files[i].name;
          temp.date = d.data.returnData.files[i].updateTime;
          temp.size = d.data.returnData.files[i].totalSize;
          temp.fileType = d.data.returnData.files[i].fileType;
          temp.isFolder = false;
          _this.tableData.push(temp);
        }
      });
    },
    openFolder(index, val) {
      let bread = {};
      bread.id = this.tableData[index].id;
      bread.name = this.tableData[index].name;
      this.breadList.push(bread);
      this.tableData = new Array();
      this.getContent(val);
    },
    backFolder(id) {
      let flag = false;
      for (let i = 0; i < this.breadList.length; i++) {
        if (this.breadList[i].id == id) {
          this.breadList.splice(i + 1, this.breadList.length - i);
          break;
        }
      }
      this.tableData = new Array();
      this.getContent(id);
    },
    saveFileToContent(rootFile, file, message, chunk) {
      if (JSON.parse(message).returnData.success == "true") {
        let fileId = JSON.parse(message).returnData.fileId;
        axion
          .saveFileToContent({
            fileId: fileId,
            rootPath: this.rootPath,
            directoryId: this.breadList[this.breadList.length - 1].id,
            fileName: file.name,
            totalSize: file.size,
            directory: file.isFolder,
            fileType: file.fileType
          })
          .then(d => {
            if (d.data.returnCode != 200) {
              this.$message(d.data.returnData);
            }
            this.$message("success");
            this.getContent(this.breadList[this.breadList.length - 1].id);
          });
      }
    },
    preprocess(chunk) {
      let uploaderInstance = this.$refs.uploader.uploader;
      // 上传或test之前执行,生成md5(如果file存在md5 就不生成了)
      if (chunk.file.md5 === "" || chunk.file.md5 == null) {
        fileMd5HeadTailTime(chunk.file, uploaderInstance.opts.chunkSize).then(
          () => {
            chunk.preprocessFinished();
          }
        );
      } else {
        chunk.preprocessFinished();
      }
    },
    handleCommand(command) {},
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    toggleSelection(row) {
      console.log('toggle');
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
      this.show();
    },
    clickTd(row, event) {
      console.log(row["id"]); //跟下面效果一样
      this.toggleSelection(row);
      // console.log(row, event); //获取各行id的值
    },
    clickTh(row, event) {
      // window.event ? (window.event.cancelBubble = true) : e.stopPropagation(); //阻止表头触发右键菜单栏
      this.$refs.multipleTable.clearSelection();
      this.menuType = false;
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
      if(this.multipleSelection.length==0){
        this.menuType = false;
      }else{
        this.menuType = true;
      }
      this.menuShow = true;
    },
    hide() {
      console.log("menu hide");
      this.menuShow = false;
    },
    minimize() {
      this.mini = !this.mini;
      this.uploadMain = !this.uploadMain;
    }
  }
};
</script>

<style scoped>
@import "../../plugins/css/home.css";
</style>

<style>
.cell {
  display: flex !important;
}
.uploader-file-icon::before {
  content: url(../../assets/small-file.png) !important;
  display: block;
  height: 100%;
  font-size: 24px;
  line-height: 1;
  text-indent: 0;
}
.uploader-file-icon[icon="folder"]::before {
  content: url(../../assets/small-folder.png) !important;
}
.uploader-file-icon[icon="image"]::before {
  content: url(../../assets/small-image.png) !important;
}
.uploader-file-icon[icon="video"]::before {
  content: url(../../assets/small-video.png) !important;
}
.uploader-file-icon[icon="audio"]::before {
  content: url(../../assets/small-music.png) !important;
}
.uploader-file-icon[icon="document"]::before {
  content: url(../../assets/small-document.png) !important;
}
</style>

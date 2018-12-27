<template>
  <div>
    <v-contextmenu ref="contextmenu" :theme="theme" @show="show" @hide="hide" style="width:150px">
      <div v-show="menuType">
        <v-contextmenu-item @click="handleOpen" :disabled="multiDisabled">打开</v-contextmenu-item>
        <v-contextmenu-item @click="handleDownload">下载</v-contextmenu-item>

        <v-contextmenu-item divider></v-contextmenu-item>

        <v-contextmenu-item @click="handleClick">分享</v-contextmenu-item>
        <v-contextmenu-item @click="handleClick">设置共享</v-contextmenu-item>

        <v-contextmenu-item divider></v-contextmenu-item>

        <v-contextmenu-item @click="dialogVisible = true">移动到...</v-contextmenu-item>
        <v-contextmenu-item @click="handleClick">复制到...</v-contextmenu-item>

        <v-contextmenu-item divider></v-contextmenu-item>

        <v-contextmenu-item @click="handleRename" :disabled="multiDisabled">重命名</v-contextmenu-item>
        <v-contextmenu-item @click="handledelete">删除</v-contextmenu-item>
      </div>
      <div v-show="!menuType">
        <v-contextmenu-item @click="newFolder">
          <i class="fas fa-plus"></i>
          <span style="margin-left:10px;">文件夹</span>
        </v-contextmenu-item>
        <v-contextmenu-item divider></v-contextmenu-item>
        <v-contextmenu-item id="click-upload-file">
          <i class="fas fa-file-upload"></i>
          <span style="margin-left:10px;">上传文件</span>
        </v-contextmenu-item>
        <v-contextmenu-item id="click-upload-folder">
          <i class="fas fa-folder-plus"></i>
          <span style="margin-left:7px;">上传文件夹</span>
        </v-contextmenu-item>
      </div>
    </v-contextmenu>

    <div class="nav">
      <el-popover placement="bottom" width="300" trigger="hover">
        <div class="uploaditem" @click="newFolder">
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
        <el-button type="primary" icon="fas fa-plus" slot="reference">新建</el-button>
      </el-popover>
      <el-button id="sort" class="hidden-sm-and-down">
        <i class="fas fa-sync-alt"></i>
      </el-button>
      <el-input
        class="hidden-sm-and-down searchInput"
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        v-model="input"
      ></el-input>
    </div>

    <div class="body">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="bread in breadList" v-bind:key="bread.id">
          <el-button type="text" style="padding: 0;" @click="backFolder(bread.id)">{{bread.name}}</el-button>
        </el-breadcrumb-item>
      </el-breadcrumb>

      <el-table
        v-contextmenu:contextmenu
        :max-height="tableHeight"
        :data="tableData"
        ref="multipleTable"
        style="width: 100%;font-size:12px;"
        @selection-change="handleSelectionChange"
        @cell-click="clickTd"
        @row-contextmenu="clickTd"
        @header-contextmenu="clickTh"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="文件" min-width="400">
          <template slot-scope="scope">
            <div>
              <div v-if="scope.row.isFolder" class="folderType"></div>
              <div style="width:18px;height: 24px;" v-else :class="scope.row.fileType"></div>
            </div>
            <span
              class="folder"
              v-if="scope.row.isFolder"
              v-show="!scope.row.editFlag"
              style="margin-left:10px;"
              @click="openFolder(scope.$index,scope.row.id)"
            >{{ scope.row.name }}</span>
            <span
              class="file"
              v-else
              v-show="!scope.row.editFlag"
              style="margin-left:10px;"
              @click="openFile(scope.row.id,scope.row.name)"
            >{{ scope.row.name }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input class="editInput" size="mini" v-model="scope.row.name" placeholder="请输入内容"></el-input>
              <el-button class="editBtn" icon="el-icon-check" @click="doRename(scope.$index)"></el-button>
              <el-button class="editBtn" icon="el-icon-close" @click="cancelRename(scope.$index)"></el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="大小" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.size }}</span>
          </template>
        </el-table-column>
        <el-table-column label="修改时间" width="300">
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
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-scrollbar style="height:200px;">
        <v-jstree
          ref="tree"
          :data="data"
          show-checkbox
          :allow-transition="false"
          whole-row
          :async="loadData"
          @item-click="itemClick"
        ></v-jstree>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button id="btn" @click="refresh" icon="el-icon-refresh" style="float:left"></el-button>
        <el-button @click="dialogVisible = false" style="width:130px">取 消</el-button>
        <el-button type="primary" @click="handleMoveOrCopy" style="width:130px">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axion from "@/utils/http_url.js"; //接口文件
import { downloadUrl,uploadUrl } from "@/utils/http_url.js";
import "element-ui/lib/theme-chalk/display.css";
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
      breadList: [],
      tableData: [],
      multipleSelection: [],
      dialogVisible: false,
      title: "移动到",
      data: [],
      checked: 0
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
    itemClick(node, item, e) {
      this.checked = node.model.id;
    },
    refresh() {
      this.data = [this.$refs.tree.initializeLoading()];
      this.$refs.tree.handleAsyncLoad(this.data, this.$refs.tree);
    },
    handleMoveOrCopy() {
      this.dialogVisible = false;
      const loading = this.$loading({
          lock: true,
          text: '准备中',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.8)'
        });
    },
    loadData(oriNode, resolve) {
      let arr = [];
      for (let i = 0; i < this. multipleSelection.length; i++) {
        if(this. multipleSelection[i].isFolder){
          arr.push(this. multipleSelection[i].id);
        }
      }
      if (oriNode.data.id == null) {
        let data = [
          {
            id: 0,
            text: "全部文件"
          }
        ];
        resolve(data);
        return;
      }
      var id = oriNode.data.id;
      axion.getDirectory(id).then(d => {
        let data = [];
        for (let i = 0; i < d.data.returnData.contents.length; i++) {
          let obj = {};
          obj.id = d.data.returnData.contents[i].id;
          if (arr.indexOf(d.data.returnData.contents[i].id) > -1) {
            obj.disabled = true;
            obj.isLeaf = true;
          }
          obj.text = d.data.returnData.contents[i].name;
          data.push(obj);
        }
        resolve(data);
        return;
      });
    },
    getOption(_this) {
      _this.options = {
        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
        target: uploadUrl,
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
      uploaderInstance.on("fileComplete", this.fileComplete);
      uploaderInstance.on("fileSuccess", this.saveFileToContent);
      uploaderInstance.on("filesAdded", this.filesAdded);
      uploaderInstance.on("fileError", this.fileError);
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
          temp.oldName = d.data.returnData.contents[i].name;
          temp.editFlag = false;
          temp.fileType = "folder";
          temp.isFolder = true;
          temp.isNew = false;
          _this.tableData.push(temp);
        }
        for (let i = 0; i < d.data.returnData.files.length; i++) {
          let temp = {};
          temp.id = d.data.returnData.files[i].id;
          temp.name = d.data.returnData.files[i].name;
          temp.date = d.data.returnData.files[i].updateTime;
          temp.size = d.data.returnData.files[i].totalSize;
          temp.oldName = d.data.returnData.files[i].name;
          temp.editFlag = false;
          temp.fileType = d.data.returnData.files[i].fileType;
          temp.isFolder = false;
          temp.isNew = false;
          _this.tableData.push(temp);
        }
      });
    },
    handleOpen() {
      if (this.multipleSelection[0].isFolder) {
        let bread = {};
        bread.id = this.multipleSelection[0].id;
        bread.name = this.multipleSelection[0].name;
        this.breadList.push(bread);
        this.tableData = new Array();
        this.getContent(this.multipleSelection[0].id);
      }
      //TODO 打开文件
    },
    openFolder(index, val) {
      let bread = {};
      bread.id = this.tableData[index].id;
      bread.name = this.tableData[index].name;
      this.breadList.push(bread);
      this.tableData = new Array();
      this.getContent(val);
    },
    openFile(id, name) {
      // const { href } = this.$router.resolve({
      //   name: "page",
      //   params: {
      //     id: id
      //   }
      // });
      // window.open(href, "_blank");
      this.$router.push({
        name: "page",
        params: {
          id: id,
          name: name
        }
      });
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
            relativePath: file.relativePath,
            totalSize: file.size,
            directory: file.isFolder,
            fileType: file.fileType
          })
          .then(d => {
            if (d.data.returnCode != 200) {
              this.$message(d.data.returnData);
            }
            if (rootFile.isFolder == false) {
              this.$message("success");
              this.getContent(this.breadList[this.breadList.length - 1].id);
            }
          });
      }
    },
    fileComplete(rootFile) {
      if (rootFile.isFolder == true) {
        this.$message("success");
        this.getContent(this.breadList[this.breadList.length - 1].id);
      }
    },
    filesAdded(files) {
      if (files.length >= 300) {
        this.$refs.uploader.uploader.cancel();
        this.$notify({
          title: "文件夹上传错误",
          type: "error",
          message: "文件数量过大，建议压缩后上传"
        });
        return false;
      } else {
        axion.validAuth().then(d => {
          this.uploadshow = true;
          this.uploadMain = true;
          return true;
        });
      }
    },
    fileError(rootFile, file, message, chunk) {
      this.$notify({
        title: "文件上传错误:" + file.name,
        duration: 0,
        type: "error",
        message: JSON.parse(message).returnType
      });
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
      this.toggleSelection(row);
    },
    clickTh(row, event) {
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
      if (this.multipleSelection.length == 0) {
        this.menuType = false;
      } else {
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
    },
    handledelete() {
      let arr = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let obj = {};
        if (this.multipleSelection[i].id == -1) {
          this.$message("存在未确认文件");
          return;
        }
        obj.id = this.multipleSelection[i].id;
        obj.isFolder = this.multipleSelection[i].isFolder;
        obj.name = this.multipleSelection[i].name;
        arr[i] = obj;
      }
      this.$confirm("是否删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axion.batchDeleteFiles(arr).then(d => {
            if (d.data.returnCode != 200) {
              this.$message(d.data.returnData);
            }
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getContent(this.breadList[this.breadList.length - 1].id);
          });
        })
        .catch(() => {});
    },
    handleDownload() {
      let arr = "";
      let flag = true;
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].id == -1) {
          this.$message("存在未确认文件");
          return;
        }
        if (flag) {
          flag = false;
        } else {
          arr += "&";
        }
        if (this.multipleSelection[i].isFolder) {
          arr = arr + "ds=" + this.multipleSelection[i].id;
        } else {
          arr = arr + "fs=" + this.multipleSelection[i].id;
        }
      }
      console.log(arr);
      let _this = this;
      let url = downloadUrl + arr;
      let xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
      xhr.responseType = "blob"; // 返回类型blob  blob 存储着大量的二进制数据
      xhr.onload = function() {
        if (this.status === 200) {
          if (this.response.size == 0) {
            _this.$message("无法下载空文件!");
            return;
          }
          let blob = this.response;
          let fileName = xhr
            .getResponseHeader("Content-Disposition")
            .substring(9);
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.target = "_blank";
          link.click();
          window.URL.revokeObjectURL(link.href);
          link.remove();
        }
      };
      xhr.send(); // 发送ajax请求
    },
    handleRename() {
      this.multipleSelection[0].editFlag = true;
    },
    doRename(index) {
      if (
        this.tableData[index].isNew &&
        this.tableData[index].name == this.tableData[index].oldName
      ) {
        this.$message("请输入文件夹名！");
        return;
      }
      if (this.tableData[index].name == this.tableData[index].oldName) {
        this.$message("与原名字相同！");
      } else {
        //新增文件夹
        if (this.tableData[index].isNew) {
          axion
            .newFolder({
              parentId: this.breadList[this.breadList.length - 1].id,
              name: this.tableData[index].name
            })
            .then(d => {
              if (d.data.returnCode != 200) {
                this.$message(d.data.returnData);
              }
              if (d.data.returnData == -1) {
                this.$message("创建失败请重试！");
                return;
              }
              this.$message("创建成功！");
              this.tableData[index].id = d.data.returnData;
              this.tableData[index].oldName = this.tableData[index].name;
              this.tableData[index].isNew = false;
            });
        }
        //重命名文件夹
        if (!this.tableData[index].isNew && this.tableData[index].isFolder) {
          axion
            .renameDirectory({
              contentId: this.tableData[index].id,
              name: this.tableData[index].name
            })
            .then(d => {
              if (d.data.returnCode != 200) {
                this.$message(d.data.returnData);
              }
              this.$message("修改成功！");
              this.tableData[index].oldName = this.tableData[index].name;
            });
        }
        //重命名文件
        if (!this.tableData[index].isNew && !this.tableData[index].isFolder) {
          axion
            .renameFile({
              fileId: this.tableData[index].id,
              name: this.tableData[index].name
            })
            .then(d => {
              if (d.data.returnCode != 200) {
                this.$message(d.data.returnData);
              }
              this.$message("修改成功！");
              this.tableData[index].oldName = this.tableData[index].name;
            });
        }
      }
      this.tableData[index].editFlag = false;
    },
    cancelRename(index) {
      if (this.tableData[index].isNew) {
        this.tableData.shift();
      } else {
        this.tableData[index].name = this.tableData[index].oldName;
        this.tableData[index].editFlag = false;
      }
    },
    newFolder() {
      let temp = {};
      temp.id = -1;
      temp.name = "";
      temp.date = "-";
      temp.size = "-";
      temp.oldName = "";
      temp.editFlag = true;
      temp.fileType = "folder";
      temp.isFolder = true;
      temp.isNew = true;
      this.tableData.unshift(temp);
    }
  }
};
</script>

<style scoped>
@import "../../plugins/css/home.css";
</style>

<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-dialog__body {
  padding: 0;
}
.cell {
  display: flex !important;
}
td {
  padding: 10px !important;
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

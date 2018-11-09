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
      <button id="uploadBtn" class="button button-primary button-raised button-glow button-longshadow-right">
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
  </div>
</template>
<script>
import axion from "@/utils/http_url.js"; //接口文件
export default {
  data() {
    return {
      menuShow: false,
      tableHeight: window.innerHeight - 180,
      input: "",
      multiDisabled: true,
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
  mounted() {},
  props: {
    theme: String
  },
  methods: {
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
      if(this.menuShow){
        this.$refs.contextmenu.hide();
        // this.menuShow = false;
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
</style>


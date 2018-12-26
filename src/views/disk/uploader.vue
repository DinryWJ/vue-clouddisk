<template>
  <div>
    <el-button id="btn" @click="test">qwe</el-button>
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="500px"
      :close-on-click-modal = "false"
      :close-on-press-escape = "false"
      :before-close="handleClose">
      <el-scrollbar style="height:200px;">
      <v-jstree
        ref="tree"
        :data="data"
        show-checkbox
        :allow-transition="false"
        whole-row
        :async="loadData"
        @item-click="itemClick">
      </v-jstree>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button id="btn" @click="refresh" icon="el-icon-refresh" style="float:left"></el-button>
        <el-button @click="dialogVisible = false" style="width:130px">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" style="width:130px">确 定</el-button>
      </span>
    </el-dialog>

    
  </div>
</template>

<script>
import axion from "@/utils/http_url.js"; //接口文件
export default {
  data() {
    return {
      dialogVisible: false,
      title:"移动到",
      data: [],
      checked: 0,
      loadData: function(oriNode, resolve) {
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
            if (d.data.returnData.contents[i].id === 80) {
              obj.disabled = true;
              obj.isLeaf = true;
            }
            obj.text = d.data.returnData.contents[i].name;
            data.push(obj);
          }
          resolve(data);
          return;
        });
      }
    };
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {},
    test() {
      axion.validAuth().then(d => {
        if (d.data.returnCode != 200) {
          this.$alert(d.data.type, "提示", {});
          return;
        }
        this.$message(d.data.returnData);
      });
    },
    itemClick(node, item, e) {
      console.log(node.model.text + " " + node.model.id + " clicked !");
      this.checked = node.model.id;
    },
    refresh() {
      this.data = [this.$refs.tree.initializeLoading()];
      this.$refs.tree.handleAsyncLoad(this.data, this.$refs.tree);
    },
    handleClose(done) {
      done();
    }
  }
};
</script>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-dialog__body{
  padding: 0;
}
</style>

<style scoped>
</style>
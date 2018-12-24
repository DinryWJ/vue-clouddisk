<template>
  <div>
    <el-button id="btn" @click="test">qwe</el-button>
    <v-jstree :data="data" show-checkbox whole-row :async="loadData" @item-click="itemClick"></v-jstree>
  </div>
</template>

<script>
import axion from "@/utils/http_url.js"; //接口文件
export default {
  data() {
    return {
      data: [
        {
          id: 0,
          text: "全部文件"
        }
      ],
      loadData: function(oriNode, resolve) {
        var id = oriNode.data.id ? oriNode.data.id : 0;
        axion.getDirectory(id).then(d=>{
          let data = [];
          for(let i=0;i<d.data.returnData.contents.length;i++){
            let obj = {};
            obj.id = d.data.returnData.contents[i].id;
            if(d.data.returnData.contents[i].id===80){
              obj.disabled = true;
              obj.isLeaf = true;
            }
            obj.text = d.data.returnData.contents[i].name;
            data.push(obj);
          }
          resolve(data);
        })
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
      console.log(node.model.text+" "+ node.model.id + " clicked !");
    }
  }
};
</script>

<style scoped>
</style>
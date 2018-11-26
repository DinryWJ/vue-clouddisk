<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item v-for="(bread, index) in breadList" v-bind:key="index">{{ bread }}</el-breadcrumb-item>
</el-breadcrumb>
</div>
</template>

<script>
import axion from "@/utils/http_url.js"; //接口文件
export default {
  data() {
    return {
      breadList:{},
      items: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
      this.getContent(0);
    },
    getContent(parentId){
      let _this = this;
      axion.getContent(parentId).then(d => {
        if (d.data.returnCode != 200) {
          this.$message(d.data.returnData);
        }
        // let arr = new Array;
        // for(let i = 0;i<d.data.returnData.length;i++){
        //   arr.push(d.data.returnData[i]);
        // }
        // this.items = arr;
        _this.items = d.data.returnData;
        _this.breadList.push('首页');
      });
    }
  }
};
</script>

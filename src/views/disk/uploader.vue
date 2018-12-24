<template>
  <div>
    <el-button id="btn" @click="test">qwe</el-button>
    <v-jstree :data="data" show-checkbox whole-row @item-click="itemClick"></v-jstree>
  </div>
</template>

<script>
import axion from "@/utils/http_url.js"; //接口文件
export default {
  data() {
    return {
      data: [
          {
            "text": "Same but with checkboxes",
            "children": [
              {
                "text": "initially selected",
                "selected": true
              },
              {
                "text": "custom icon",
                "icon": "fa fa-warning icon-state-danger"
              },
              {
                "text": "initially open",
                "icon": "fa fa-folder icon-state-default",
                "opened": true,
                "children": [
                  {
                    "text": "Another node"
                  }
                ]
              },
              {
                "text": "custom icon",
                "icon": "fa fa-warning icon-state-warning"
              },
              {
                "text": "disabled node",
                "icon": "fa fa-check icon-state-success",
                "disabled": true
              }
            ]
          },
          {
            "text": "Same but with checkboxes",
            "opened": true,
            "children": [
              {
                "text": "initially selected",
                "selected": true
              },
              {
                "text": "custom icon",
                "icon": "fa fa-warning icon-state-danger"
              },
              {
                "text": "initially open",
                "icon": "fa fa-folder icon-state-default",
                "opened": true,
                "children": [
                  {
                    "text": "Another node"
                  }
                ]
              },
              {
                "text": "custom icon",
                "icon": "fa fa-warning icon-state-warning"
              },
              {
                "text": "disabled node",
                "icon": "fa fa-check icon-state-success",
                "disabled": true
              }
            ]
          },
          {
            "text": "And wholerow selection"
          }
        ]
    };
  },

  mounted() {
    this.init();
  },
  methods: {
    init(){},
    test() {
      axion.validAuth().then(d => {
        if (d.data.returnCode != 200) {
          this.$alert(d.data.type, "提示", {});
          return;
        }
        this.$message(d.data.returnData);
      });
    },
    itemClick (node) {
          console.log(node.model.text + ' clicked !')
    }
  }
};
</script>

<style scoped>

</style>
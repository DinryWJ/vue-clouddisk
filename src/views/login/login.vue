<template>
  <div id="note" :style ="note">

  <el-row>
    <el-col :xs="8" :sm="9" :md="9" :lg="9" :xl="9">
      <div class="grid-content">
          <div><img :src="icon" style="height:100%;margin-left:20px;"/></div>
          <!-- <div class="slogan">稳定，高效</div> -->
      </div>
    </el-col>
    <el-col :xs="8" :sm="6" :md="6" :lg="6" :xl="6"><div class="grid-content"></div></el-col>
    <el-col :xs="8" :sm="9" :md="9" :lg="9" :xl="9">
      <div class="grid-content" id="login_field">
        <div class="label" style="">帐号密码登录</div>
        <el-input v-model="name" placeholder="账号"></el-input>
        <el-input v-model="pass" placeholder="密码"></el-input>
        <el-checkbox v-model="checked" style="margin:16px 0;">下次自动登录</el-checkbox>
        <div></div>
        <el-button type="primary" style="display:block;width:100%;margin:8px 0;" @click="login">登录</el-button>
        <el-button type="text">忘记密码？</el-button>
        <el-button type="text" style="float:right;margin-right:10px;" @click="goRegister">立即注册</el-button>
      </div>
    </el-col>
  </el-row>
  </div>

</template>
<script>
import axion from "@/utils/http_url.js"; //接口文件
import logo from "@/assets/logo2.png";
export default {
  data() {
    return {
      icon: logo,
      name: "",
      pass: "",
      checked: false,
      note: {
        backgroundImage: "url(" + require("../../assets/cover.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% ",
        width: "100%",
        height: "100%",
        position: "fixed",
        display: "block"
      }
    };
  },
  mounted() {},
  methods: {
    login() {
      let flag = true;
      if (this.name === "" && this.pass === "") {
        this.$message('用户名密码不能为空');
        flag = false;
      }
      if (this.name === "" && this.pass !== "") {
        this.$message('用户名不能为空');
        flag = false;
      }
      if(this.name !== "" && this.pass === ""){
        this.$message('密码不能为空');
        flag = false;
      }
      if (flag) {
        axion
          .login({
            username: this.name,
            password: this.pass
          })
          .then(d => {
            if (d.data.returnCode != 200) {
              this.$message(d.data.returnData);
              return;
            }
            this.$store.commit("ADD_TOKEN", d.data.returnData);
            if (this.$route.query.redirect != null) {
              this.$router.push(this.$route.query.redirect);
            } else {
              this.$router.push("/disk/home");
            }
          });
      }
    },
    goRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped>
#login_field {
  background-color: #fff;
  width: 312px;
  height: 405px;
  margin-top: 30%;
  padding: 0px 20px;
}
.slogan {
  font-size: 44px;
  color: #fff;
  margin-top: 200px;
  margin-left: 100px;
}
.label {
  font-weight: 600;
  font-size: 18px;
  padding: 40px 0;
}
.el-row {
  margin-bottom: 20px;
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
</style>
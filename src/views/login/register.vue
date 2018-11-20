<template>
  <div>
    <div class="navbar">
      <div>
        <img :src="icon" style="height:76px;margin-left:20px;"/>
        <el-button type="text" style="float:right;height: 76px;color: #fff;margin-right:100px;" @click="goLogin">我已注册，登录</el-button>
      </div>
    </div>
    <div class="body">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="name">
          <el-input v-model="ruleForm2.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')" style="width:300px;">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axion from "@/utils/http_url.js"; //接口文件
import logo from "@/assets/logo2.png";
export default {
  data() {
    var checkname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      axion.valid(value).then(d => {
        if (d.data.returnCode != 200) {
          return callback(new Error(d.data.returnData));
        }
        callback();
      });
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      icon: logo,
      ruleForm2: {
        pass: "",
        checkPass: "",
        name: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: checkname, trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    goLogin() {
      this.$router.push("/");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axion
            .register({
              username: this.ruleForm2.name,
              pass: this.ruleForm2.pass,
              checkpass: this.ruleForm2.checkPass
            })
            .then(d => {
              if (d.data.returnCode != 200) {
                this.$message(d.data.returnData);
                return;
              }
              this.$router.push("/");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.navbar {
  height: 76px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.body {
  padding: 50px 50px;
  width: 400px;
  margin-left: 200px;
}
</style>
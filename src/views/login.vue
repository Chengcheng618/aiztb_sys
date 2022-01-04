<template>
  <div class="login">
    <h1 class="title">爱招投标后台管理平台</h1>
    <div class="input">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="userName">
          <div class="input_items">
            <img src="../assets/images/username.png" alt="" />
            <el-input
              v-model="ruleForm.userName"
              autocomplete="off"
              placeholder="请输入管理账号"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="passWord">
          <div class="input_items">
            <img src="../assets/images/password.png" alt="" />
            <el-input
              type="password"
              v-model="ruleForm.passWord"
              autocomplete="off"
              placeholder="请输入账号密码"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="Remchecked" @change="Checkchange"
            >记住账户密码</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm('ruleForm')">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === undefined) {
        callback(new Error("请输入账号"));
      } else {
        if (this.ruleForm.userName != "cinghoo") {
          callback(new Error("用户名错误"));
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === undefined) {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.passWord != "cinghoo123") {
          callback(new Error("密码错误"));
        }
        callback();
      }
    };
    return {
      ruleForm: {
        userName: "",
        passWord: "",
      },
      rules: {
        userName: [{ validator: validateUser, trigger: "blur" }],
        passWord: [{ validator: validatePass, trigger: "blur" }],
      },
      Remchecked: false,
    };
  },
  methods: {
    //   表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            user_name: this.ruleForm.userName,
            password: this.ruleForm.passWord,
          };
          this.$axiosPost("/user/login", params).then((res) => {
            if (res.data.code == 200) {
              window.sessionStorage.setItem(
                "access_token",
                res.data.data.token
              );
              this.$router.push({
                name: "Home",
                params: {  },
              });
            } else {
              this.$message.error(res.data.data);
            }
          });
        } else {
          return false;
        }
      });
    },
    Checkchange() {
      if (
        this.ruleForm.userName == "cinghoo" &&
        this.ruleForm.passWord == "cinghoo123"
      ) {
        window.localStorage.setItem("Remchecked", this.Remchecked);
      }
    },
  },
  created() {
    if (window.localStorage.getItem("Remchecked") == "true") {
      this.ruleForm = {
        userName: "cinghoo",
        passWord: "cinghoo123",
      };
      this.Remchecked = true;
    }
  },
};
</script>

<style lang='less' scoped>
.login {
  background: url("../assets/images/bgm.png") no-repeat;
  height: 100vh;
  background-size: 100% 100%;
  .title {
    text-align: center;
    margin: 0;
    padding-top: 10%;
    font-size: 48px;
    font-weight: 500;
    color: #ffffff;
    line-height: 67px;
    text-shadow: 0px 2px 4px #154ac1;
  }
  .input {
    width: 20%;
    background: #fff;
    margin: 5% auto;
    box-shadow: 0px 2px 7px 4px #4c7df1;
    border-radius: 50px;
    padding: 70px 30px 10px;
    .input_items {
      display: flex;
      align-items: center;
      border-radius: 10px;
      border: 1px solid #3b6dee;
      flex: 1;
      img {
        width: 20px;
        height: 20px;
        margin-left: 15px;
      }
    }
  }
}
/deep/ .el-form {
  .el-form-item__content {
    // text-align: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
    .el-button {
      background: linear-gradient(180deg, #7fb1fb 0%, #3b6dee 100%);
      box-shadow: 0px 8px 8px 0px rgba(86, 139, 243, 0.31);
      border-radius: 5px;
      padding: 12px 50px;
      color: #fff;
    }
    .el-input {
      margin: 0 15px;
    }
    .el-input__inner {
      border: none;
      padding: 0;
    }
    .el-checkbox {
      padding: 0 5px;
      flex: 1;
      font-size: 18px;
      color: #979797;
      margin-top: -15px;
      text-align: right;
    }
  }
}
</style>
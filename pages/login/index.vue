<template>
  <section class="pageMain wrap flex-row">
    <div class="img"><img src="@/assets/img/login_img.jpg" alt="网络指挥平台"></div>
    <div class="loginBox flex-1">
      <div class="box">
        <div class="welcome"><img src="@/assets/img/welcome.png" alt="欢迎登录"></div>
        <el-form ref="form" :model="form" :rules="formRules">
          <el-form-item prop="name">
            <el-input v-model.trim="form.name" placeholder="请输入账号">
              <i slot="prefix" class="el-input__icon el-icon-mobile"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model.trim="form.password" type="password" placeholder="请输入密码">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round class="submit-btn" @click="submitForm('form')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
const md5 = require("js-md5");

export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
      formRules: {
        name: [
          { required:true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required:true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let login_params = this.common.deepcopy(this.form);
          // if (this.form.password) {
          //   login_params.password = md5(this.form.password);
          // }

          console.log(login_params,'login_params');
          if(login_params.name != 'admin' || login_params.password != '123456'){
            this.$message.error('用户名或密码错误！');
            return
          }
          // this.$store.dispatch("LOGIN", login_params).then((res) => {
          //   this.loginSuccess(res);
          // });
          let res = {
            status: "200",
            statusCode: "登录成功",
            data: {
              username: "admin",
              access_token: "28aee04dca65efc38aed14194ad7f44c",
            }
          }
          this.loginSuccess(res);
          
        }
      });
    },
    loginSuccess(res){
      let data = res.data;
      this.common.setCookie('token',data.access_token, 0);
      this.common.storage('user',data);
      this.$message.success(res.statusCode);

      setTimeout(() => {
        window.location.href="/"
      }, 1000);
    },
  },
};
</script>

<style scoped lang="postcss">
.pageMain {padding:107px 0 0;
  > .img { width:732px;}
}
.loginBox { padding-top:80px;
  .box { width:380px; padding:50px 50px 50px; box-sizing:border-box; background:rgba(255,255,255,.3); position:relative;
    &::before,&::after { content:''; display:block; width:337px; height:18px; background:resolve('login_light.png') no-repeat; position:absolute; left:50%; transform:translate(-50%,0);}
    &::before { top:-9px;}
    &::after { bottom:-9px;}
  }
  .welcome { text-align:center; margin-bottom:15px;}
}
.submit-btn { width:100%; background:linear-gradient(180deg,#eec380, #fbeba3); color:#333333; border-color:transparent; padding:16px 23px; border-radius:25px; font-size:16px;}

.el-icon-mobile::before,.el-icon-lock::before { display:inline-block; content:''; width:25px; height:25px; background:resolve('ico.png') no-repeat; vertical-align:middle;}
.el-icon-lock::before { background-position:-25px 0;}

.el-form {
  .el-form-item { margin-bottom:35px;}
  >>> .el-input__prefix { left:15px;}
  >>> .el-input--prefix .el-input__inner { padding-left:50px; border-radius:25px; height:50px; line-height:50px;}
  >>> .el-form-item__error { color:#f1d08b;}
}

</style>
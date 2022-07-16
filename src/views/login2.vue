<!--  -->
<template>
  <div class="login2">
    <div class="login2-bg" />
    <div class="login2-container">
      <div class="login2-container-title">
        <!-- <el-avatar :src="avatar" :size="80"></el-avatar> -->
        <strong>后台管理系统</strong>
      </div>
      <el-row :gutter="15">
        <el-form ref="loginForm" :rules="loginRules" :model="loginForm">
          <el-form-item prop="username" class="login2-container-form-wrap">
            <input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          </el-form-item>
          <el-form-item prop="password" class="login2-container-form-wrap">
            <input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码">
          </el-form-item>
          <el-form-item v-if="captchaOnOff" prop="code" class="login2-container-code">
            <input v-model="loginForm.code" type="text" auto-complete="off" placeholder="验证码">
            <img :src="codeUrl" class="login2-code-img" @click="getCode">
          </el-form-item>
          <el-form-item class="remember">
            <el-checkbox v-model="loginForm.rememberMe" class="login2-container-form-agree">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item class="login2-container-form-wrap">
            <div class="login2-container-action">
              <div class="login2-container-action-login" @click="handleLogin">登录</div>
            </div>
          </el-form-item>
          <div class="login2-container-or"><span>OR</span></div>
          <el-form-item class="login2-container-form-wrap">
            <div class="login2-container-action">
              <router-link class="login2-container-action-sign" :to="'/register'">立即注册</router-link>
            </div>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from '@/api/login'
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'

// import avatar from "@img/user.jpg"
export default {
  name: 'Login',
  data() {
    return {
      codeUrl: '',
      loginForm: {
        username: 'admin',
        password: 'admin123',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入您的账号' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入您的密码' }
        ],
        code: [{ required: true, trigger: 'change', message: '请输入验证码' }]
      },
      loading: false,
      // 验证码开关
      captchaOnOff: true,
      // 注册开关
      register: true,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getCode()
    this.getCookie()
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.captchaOnOff = res.captchaOnOff === undefined ? true : res.captchaOnOff
        if (this.captchaOnOff) {
          this.codeUrl = 'data:image/gif;base64,' + res.img
          this.loginForm.uuid = res.uuid
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getCookie() {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.loginForm.rememberMe) {
            Cookies.set('username', this.loginForm.username, { expires: 30 })
            Cookies.set('password', encrypt(this.loginForm.password), { expires: 30 })
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' }).catch(e => {
              console.log(e)
            })
          }).catch(() => {
            this.loading = false
            if (this.captchaOnOff) {
              this.getCode()
            }
          })
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
input{
  border:none;
  outline: none;
  padding-left:2rem;
  box-shadow:2px 2px 2px 0px rgba(0,0,0,.3);
  padding-top: .3rem;
   font-size: 1.5rem;
}
.login2{
  position: relative;
  overflow: hidden;
  height:100vh;
  &-bg{
    background:url("~@img/bg.jpg");
    z-index:-100;
    position: absolute;
    height:100%;
    width:100%;
    background-size:cover;
  }

  &-container{
    width:28rem;
    background:rgba(255,255,255,0.8);
    padding:2.2rem;
    margin:3.6rem auto 0;
    font-family: sans-serif;
    border-radius:.2rem;
    box-shadow:2px 2px 5px rgba(0,0,0,.8);
    &-title{
      text-align: center;
      font-size:1.4rem;
      margin-top:.5rem;
      color:#2980b9;

      strong{
        margin:2rem 0;
        font-size:2.2rem;
        display:block;
      }
    }
    &-form{
      margin:1rem 0;
      text-align: center;

      &-wrap{
        margin-bottom:1.4rem;
        height:2.8rem;
        input{
          width:100%;

          height:2.8rem;

          border-radius:2.8rem;

          &::placeholder{
            font-size:1.5rem
          }
        }
      }

      &-agree{

        float:right;
        text-align: right;
        // margin:1.6rem 0;
        font-size:.7rem;
        input{
          margin-right:.4rem;
        }
      }

    }

    &-action{
      display:flex;
      justify-content: center;
      text-align:center;
      font-size:1.2rem;
      cursor: pointer;
      &-login{
        width:100%;
        line-height:2.8rem;
        background:#3498db;
        color:white;
        border-radius:2.8rem;
        &:hover{
           background:#2980b9;
        }
      }
      &-sign{
        width:100%;
        line-height:2.8rem;
        color:white;
        background:#3498db;
        border-radius:2.8rem;
        &:hover{
           background:#2980b9;
        }
      }
    }
    &-or{
      width:90%;
      //border:1px solid black;
      margin:1.8rem auto;
      text-align: center;
      display:flex;
      &:before,&:after{
        content: "";
        flex: 1 1;
        border-bottom: 1px solid #000;
        margin: auto;
      }
    }

    &-code{
      input{
        float:right;
        // margin-left: .8rem;
        width: 14rem;
        height: 2rem;
        font-size: 1rem;
      }
      img{
        // float:right;
        margin-left: 1.8rem;
        height: 2rem;
        vertical-align: middle;
      }
    }

    &-link{
      margin-top:1.8rem;
      text-align:center;
    }
  }

}
</style>

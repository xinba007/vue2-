<template>
   <div class="login-common-wrap">
      <div class="login-common-content">
         <p class="title">
            <img src="@/assets/login/qyweixin.png" alt="" v-if="loginStatus">
            {{loginStatus?'微信':'账号'}}登录
         </p>
         <div class="content" v-if="!loginStatus">
            <el-form :model="loginform" status-icon :rules="rules" ref="loginForms" label-width="0" class="demo-ruleForm">
               <el-form-item prop="username" class="input-wrap">
                  <div class="input-box">
                     <label for="">账号</label>
                     <el-input v-model="loginform.username" type="text" placeholder="账号"></el-input>
                  </div>
               </el-form-item>
                <el-form-item prop="password"  class="input-wrap">
                  <div class="input-box">
                     <label for="">密码</label>
                     <el-input v-model="loginform.password" type="password" placeholder="密码"  @keyup.enter.native="handleLogin"></el-input>
                  </div>
                </el-form-item>
            </el-form>
            <el-button type="primary" style="width:100%" @click="handleLogin"  @keyup.enter.native="handleLogin">登录</el-button>
         </div>
         <div class="qyweixinewm-box" v-show="loginStatus" >
            <div id="wx_reg" v-show="loginStatus" :style="{display:loginStatus?'':'none'}"></div>
         </div>
         <p class="title bottom-tip" @click="loginStatus=!loginStatus"><img src="@/assets/login/qyweixin.png" alt="" v-if="!loginStatus"> {{loginStatus?'账号密码':'扫码'}}登录</p>
      </div>
      
   </div>
</template>
<script>
import {
   qywxAppid,
   qywxAgentid,
   qywxRedirectUrl,
   qywxState
  } from '../../../config'
export default {
   data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账户'));
        } else {
          callback();
        }
      };
      return {
        qywxAppid,
         qywxAgentid,
         qywxRedirectUrl,
         qywxState,
         loginStatus:true,
         loginform:{
            username:'',
            password:''
         },
         rules:{
            username: [
               { validator: validateUsername, trigger: 'blur' }
            ],
            password: [
               { validator: validatePass, trigger: 'blur' }
            ],
         },
      }
   },
   mounted(){
      this.loadScript();
   },
   methods:{
      loadScript() {
         let s = document.createElement("script");
         s.setAttribute(
            "src",
            "https://rescdn.qqmail.com/node/ww/wwopenmng/js/sso/wwLogin-1.0.0.js"
         );
         document.head.appendChild(s);
         let that = this;
         console.log(qywxAppid,qywxAgentid,qywxRedirectUrl,qywxState)
         s.onload = function() {
            window.WwLogin({
               id: "wx_reg",
               appid: qywxAppid,
               agentid: qywxAgentid,
               redirect_uri: qywxRedirectUrl,
               state:qywxState,
               href:"data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlIHsKIGRpc3BsYXk6IG5vbmU7Cn0KLmltcG93ZXJCb3ggLnN0YXR1cy5zdGF0dXNfYnJvd3NlciB7CiBkaXNwbGF5OiBub25lOwp9Ci5pbXBvd2VyQm94IHsKIHdpZHRoOjcxJTsKfQoud3JwX2NvZGUgewogbWFyZ2luLXRvcDo4cHghaW1wb3J0YW50Owp9Ci5pbXBvd2VyQm94IC5xcmNvZGUgewogYm9yZGVyOiBub25lOwogd2lkdGg6IDIwMHB4OwogaGVpZ2h0OiAyMDBweDsKfQouaW1wb3dlckJveCAuc3RhdHVzewogZGlzcGxheTogbm9uZQp9"
            });
         };
      },
      async handleLogin() {
         let canSubmit = true;
         this.$refs.loginForms.validate((valid) => {
            if (valid) {
            } else {
               canSubmit = false
            }
         });
         if(!canSubmit) return;
         const status = await this.$store.dispatch("userLogin", this.loginform);
         if (status && status === 200) this.$router.push({ path: "/home" });
      }
   }
}
</script>
<style lang="scss" scoped>
.login-common-wrap{
   display: flex;
   align-content: center;
   align-items: center;
   justify-content: center;
   justify-items: center;
   width: 100%;
   height: 100%;
   overflow: hidden;
   background: url('../../assets/login/login-commonbg.png') no-repeat center center;
   background-size: 100% 100%;
   .login-common-content{
      width: 394px;
      height: 400px;
      padding: 24px 65px;
      background: #FFFFFF;
      box-shadow: 2px 7px 21px 0px rgba(8, 51, 173, 0.12);
      border-radius: 10px;
      .qyweixinewm-box{
         width: 218px;
         height: 216px;
         margin: 44px auto 54px;
         border: 1px solid #ccc;
         overflow: hidden;
      }
      .content{
         margin: 55px 0;
         width: 100%;
         .input-wrap{
            margin-bottom: 16px;
            &:nth-of-type(2){
               margin-bottom: 48px;
            }
         }
         .input-box{
            label{
               display: block;
               margin-bottom: 4px;
               font-size: 12px;
               font-weight: 400;
               color: #8C8C8C;
               line-height: 12px;
              
            }
         }
      }
      .title{
         margin: 0;
         height: 24px;
         width: 100%;
         display: flex;
         align-content: center;
         align-items: center;
         justify-items: center;
         justify-content: center;
         font-size: 24px;
         font-weight: 500;
         color: #2C2D2F;
         line-height: 24px;
         img{
            display: block;
            width: 30px;
            height: 24px;
            margin-right: 8px;
         }
      }
      .bottom-tip{
         height: 20px;
         font-size: 14px;
         font-weight: 400;
         color: #4979FF;
         line-height: 16px;
         cursor: pointer;
         img{
            width: 20px;
            height: 16px;
         }
      }
   }
}
</style>
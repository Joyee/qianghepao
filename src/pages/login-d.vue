<template>
    <div class="login">
      <div class="log">
        <input type="text" :class="'log-input' + (account == '' ? ' log-input-empty' : '')" v-model="account">
        <input type="password" :class="'log-input' + (password == '' ? ' log-input-empty' : '')" v-model="password">
        <button class="log-btn" @click="loginBtn">登录</button>
      </div>
      <Loading v-if="isLoging"></Loading>
	  </div>
</template>

<script>
import register from "@/components/register"
import Loading from './Loading.vue'
export default {
  name: "login",
  data() {
    return {
      isLoging: false,
      account: "",
      password: ""
    };
  },
  components: {
    Loading,
    register
  },
  created: function() {
    this.delCookie('userInfo')
    this.delCookie('account')
  },
  methods: {
    // 登录逻辑
    loginBtn: function() {
      if (this.account !== '' && this.password !== '') {
        this.toLogin()
      }
    },
    // 登录请求
    toLogin: function () {
      let _this = this
      let password_sha = hex_sha1(hex_sha1(_this.password))
      // 需要向后端发送的登录参数
      let loginParam = {
        account: _this.account,
        passWord: password_sha
      }
      // 设置在登录状态
      _this.isLoging = true
    
      _this.$http.post('/api/user/login?account=' + _this.account + '&passWord=' + _this.password).then((response) => {
        if (response.data.code == 200) {
          console.log(response.data.data)
          let expirDays = 1000 * 60 * 60 * 24 * 15
          _this.setCookie('account', response.data.data.mobile, expirDays)
          _this.setCookie('userInfo', JSON.stringify(response.data.data), expirDays)
          _this.$router.push('/home')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
};
</script>

<style scoped>
.login {
  width: 400px;
  margin: 0 auto;
}
.el-tabsitem {
  text-align: center;
  width: 60px;
}

.log-input-empty{border: 1px solid #f37474 !important;}
.isloading{background: #d6d6d6}
</style>


<template>
	<div class="login">
		<h2>登录</h2>
		<el-form label-position="right" :model="loginForm" :rules="loginRules" ref="loginForm" label-width="70px" class="loginForm">
			<el-form-item label="手机号" prop="phone">
				<el-input type="phone" v-model="loginForm.phone" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
				<el-button @click="resetForm('loginForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      let checkPhone = (rule, value, callback) => {
        const PHONE_REGEXP = /^((13[0-9])|(15[^4])|(18[0-3,5-9])|(17[0-8])|(147))\d{8}$/
        const HONGKONG_PHONE_REGEXP = /^(5|6|8|9)\d{7}$/
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else if (!PHONE_REGEXP.test(value) && !HONGKONG_PHONE_REGEXP.test(value)) {
          callback(new Error('手机号格式有误'))
        }
        callback()
      }
      let validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        }
        callback()
      }
      return {
        loginForm: {
          phone: '',
          password: '',
          rememberMe: false
        },
        loginRules: {
          phone: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ]
        },
        loading: false
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            let user = {
              account: this.loginForm.phone,
              passWord: this.loginForm.password
            }
            this.$store.dispatch('login', user).then(() => {
              this.loading = false
              alert('登录成功')
              this.$router.push({path: '/'})
            }).catch(error => {
              this.loading = false
            })
          } else {
            alert('error login!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>
  .login {
    background: #fff;
    width: 800px;
    height: 500px;
    padding: 40px 80px;
  }
  .login h2 {
    margin-bottom: 30px;
    text-align: center;
  }
  .loginForm a {
    float: right;
    color: #70bde0;
  }
</style>




















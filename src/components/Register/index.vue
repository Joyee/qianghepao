<template>
	<div class="register">
		<h2>注册</h2>
		<el-form label-position="right" :model="registerForm" :rules="registerRules" ref="registerForm" label-width="90px" class="registerForm">
			<el-form-item label="用户名" prop="account">
				<el-input type="text" v-model="registerForm.account" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="mobile">
				<el-input type="phone" v-model="registerForm.mobile" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="passWord">
				<el-input type="password" v-model="registerForm.passWord" auto-complete="off"></el-input>
			</el-form-item>
			<!-- <el-form-item label="验证密码" prop="checkPassword">
				<el-input type="password" v-model="registerForm.checkPassword" auto-complete="off"></el-input>
			</el-form-item> -->
			<el-form-item label="短信验证码" prop="code">
				<el-input class="validCode-input" v-model="registerForm.code"></el-input>
				<el-button type="primary" :loading="isGettingValidCode" @click="getValidCode">{{validCodeState}}</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
				<el-button @click="resetForm('registerForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script type="text/javascript">
	import {register} from '../../api/register.js'
	export default {
		name: 'register',
		data () {
			let checkName = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入用户名'))
				} else {
					callback()
				}
			}
			let checkPhone = (rule, value, callback) => {
				const PHONE_REGEXP = /^((13[0-9])|(15[^4])|(18[0-3,5-9])|(17[0-8])|(147))\d{8}$/
        const HONGKONG_PHONE_REGEXP = /^(5|6|8|9)\d{7}$/

        if (value === '') {
					callback(new Error('请输入手机号'))
				} else if (!PHONE_REGEXP.test(value) && !HONGKONG_PHONE_REGEXP.test(value)) {
					callback(new Error('手机号格式有误'))
				} else {
					callback()
				}
			}
			let validatePassword = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'))
				} else {
					if (this.registerForm.checkPass !== '') {
						this.$refs.registerForm.validateField('checkPassword')
					}
					callback()
				}
			}
			// let validateCheckPassword = (rule, value, callback) => {
			// 	if (value === '') {
			// 		callback(new Error('请再次输入密码'))
			// 	} else if (value !== this.registerForm.password) {
			// 		callback(new Error('两次输入密码不一致!'))
			// 	} else {
			// 		callback()
			// 	}
			// }
			return {
				validCodeState: '获取验证码',
				isGettingValidCode: false,
				waitTime: 60,
				registerForm: {
					account: '',
					mobile: '',
					code: '',
					passWord: '',
					// checkPassword: ''
				},
				registerRules: {
					account: [
						{validator: checkName, trigger: 'blur'}
					],
					mobile: [
						{validator: checkPhone, trigger: 'blur'}
					],
					password: [
						{validator: validatePassword, trigger: 'blur'}
					],
					// checkPassword: [
					// 	{validator: validatePassword, trigger: 'blur'}
					// ]
				}
			}
		},
		methods: {
			getValidCode() {
				const GET_VALID_CODE_URL = ''
				this.validCodeState = this.waitTime + '秒'
				this.isGettingValidCode = true
				let validCodeTimer = setInterval(() => {
					if (this.waitTime === 1) {
						clearInterval(validCodeTimer)
						this.isGettingValidCode = false
						this.validCodeState = '获取验证码'
						this.waitTime = 60
					} else {
						this.waitTime--
						this.validCodeState = this.waitTime + '秒'
					}
				}, 1000)

				this.$http.post('/api/code/getCode?mobile=' + this.registerForm.mobile)
				.then(response => {
					if (response.data.code == 200) {
						console.log(response.data.msg)
					}
				}).catch(response => {
					console.log(response)
				})
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						register(this.registerForm).then(res => {
							console.log(res)
							if (res.data.code === 200) {
								alert(`${res.data.msg},请登录`)
								this.$router.push({path: '/'})
							} else {
								alert(res.data.msg)
							}
						})
					} else {
						console.log('error register')
						return false
					}
				})
			}
		},
		resetForm (formName) {
			this.$refs[formName].resetFields()
		}
	}
</script>

<style type="text/css" scoped>
	.register {
    background: #fff;
    width: 800px;
    height: 500px;
    padding: 40px 80px;
  }
  .register h2 {
    margin-bottom: 30px;
    text-align: center;
  }
  .validCode-input {
    width: 200px;
    margin-right: 20px;
  }
</style>





















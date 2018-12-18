<template>
	<div class="login">
		<h2>登录</h2>
		<el-form v-if="!forgetFlag" label-position="right" :model="loginForm" :rules="loginRules" ref="loginForm" label-width="70px" class="loginForm">
			<el-form-item label="手机号" prop="phone" :error="errorMsg">
				<el-input type="phone" v-model="loginForm.phone" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<a href="javascript:;" @click="handleForgetPwd" style="cursor: pointer;">忘记密码</a>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
				<el-button @click="resetForm('loginForm')">重置</el-button>
			</el-form-item>
		</el-form>
		
		<!-- 忘记密码 -->
		<el-form v-else label-position="right" :model="forgetPwdForm" :rules="forgetPwdRules" ref="forgetPwdForm" class="forgetPwdForm">
			<el-form-item prop="phone">
				<el-input type="phone" v-model="forgetPwdForm.phone" auto-complete="off" placeholder="请输入手机号">
					<i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
				</el-input>
			</el-form-item>
			<el-form-item prop="code">
				<el-input type="text" class="validCode-input" v-model="forgetPwdForm.code" auto-complete="off" placeholder="请输入验证码">
					<i slot="prefix" class="el-input__icon el-icon-setting"></i>
				</el-input>
				<el-button type="primary" :loading="isGettingValidCode" @click="getValidCode">{{validCodeState}}</el-button>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" v-model="forgetPwdForm.password" auto-complete="off" placeholder="请输入密码">
					<i slot="prefix" class="el-input__icon el-icon-question"></i>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="confirmChangePwd('forgetPwdForm')">确定</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
    name: 'login',
    data() {
        let checkPhone = (rule, value, callback) => {
            const PHONE_REGEXP = /^((13[0-9])|(15[^4])|(18[0-3,5-9])|(17[0-8])|(147))\d{8}$/;
            const HONGKONG_PHONE_REGEXP = /^(5|6|8|9)\d{7}$/;
            if (value === '') {
                callback(new Error('请输入手机号'));
            } else if (!PHONE_REGEXP.test(value) && !HONGKONG_PHONE_REGEXP.test(value)) {
                callback(new Error('手机号格式有误'));
            }
            callback();
        };
        let validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }
            callback();
        };
        let validateCode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码'));
            }
            callback();
        };
        return {
            loginForm: {
                phone: '',
                password: '',
                rememberMe: false
            },
            loginRules: {
                phone: [{ validator: checkPhone, trigger: 'blur' }],
                password: [{ validator: validatePassword, trigger: 'blur' }]
            },
            errorMsg: '',

            forgetPwdForm: {
                phone: '',
                code: '',
                password: ''
            },
            forgetPwdRules: {
                phone: [{ validator: checkPhone, trigger: 'blur' }],
                password: [{ validator: validatePassword, trigger: 'blur' }],
                code: [{ validator: validateCode, trigger: 'blur' }]
            },
            forgetFlag: false,

            validCodeState: '获取验证码',
            isGettingValidCode: false,
            waitTime: 60
        };
    },
    methods: {
        getValidCode() {
            this.validCodeState = this.waitTime + '秒';
            this.isGettingValidCode = true;
            let validCodeTimer = setInterval(() => {
                if (this.waitTime === 1) {
                    clearInterval(validCodeTimer);
                    this.isGettingValidCode = false;
                    this.validCodeState = '获取验证码';
                    this.waitTime = 60;
                } else {
                    this.waitTime--;
                    this.validCodeState = this.waitTime + '秒';
                }
            }, 1000);

            this.$http
                .post('/api/code/getCode?mobile=' + this.forgetPwdForm.phone)
                .then(response => {
                    if (response.data.code == 200) {
                        console.log(response.data.msg);
                    }
                })
                .catch(response => {
                    console.log(response);
                });
        },
        handleForgetPwd: function() {
            this.forgetFlag = true;
        },
        confirmChangePwd: function(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = {
                        mobile: this.forgetPwdForm.phone,
                        code: this.forgetPwdForm.code,
                        pwd: this.forgetPwdForm.password
                    };
                    this.$http.post('/api/user/lostPwd', params).then(resposne => {
						if (resposne.data.code == 200) {
							this.$message({
								message: resposne.data.msg + '请登录！',
								type: 'success'
							})
							this.forgetFlag = false
						}
                    });
                }
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let user = {
                        account: this.loginForm.phone,
                        passWord: this.loginForm.password
                    };
                    this.$store
                        .dispatch('login', user)
                        .then(res => {
                            this.loading = false;
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
                            this.$router.push({ path: '/' });
                        })
                        .catch(error => {
                            this.errorMsg = '账号或密码错误';
                        });
                } else {
                    alert('error login!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
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

.validCode-input {
    width: 200px;
    margin-right: 20px;
}
</style>

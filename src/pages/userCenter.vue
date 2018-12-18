<template>
	<div class="user-center">
		<div class="user-info">
			<img :src="avatar" alt="" class="avatar">
			<h4 class="username">{{username}}</h4>
		</div>
		<div class="tab">
			<ul class="nav">
				<li><a href="javascript:;" @click="tabIdx=0" :class="{'cur':tabIdx === 0}">我的收藏</a></li>
				<li><a href="javascript:;" @click="getMessage" :class="{'cur':tabIdx === 1}">消息</a></li>
				<li><a href="javascript:;" @click="tabIdx=2" :class="{'cur':tabIdx === 2}">设置</a></li>
			</ul>
			<div class="tab-content">
				<div v-show="tabIdx === 0" class="lists">
					<ul v-if="collectInfo.length > 0">
						<li v-for="(list, index) in collectInfo" :key="index" @click="goDetail(list.id)">
							<div class="card">
								<div class="card-head"><img :src="list.pic" alt="">
									<h4>{{list.title}}</h4>
								</div>
								<div class="card-content" v-html="list.content"></div>
								<div class="card-bottom">
									<div class="view">
										<img class="icon-view" src="../assets/images/icons/icon-view.png" alt=""><span>{{list.viewNum}}</span>
									</div>
									<div class="like">
										<img class="icon-like" src="../assets/images/icons/icon-like.png" alt=""><span>{{list.likeNum}}</span>
									</div>
								</div>
							</div>
						</li>
					</ul>
					<div v-else>暂无收藏信息</div>
				</div>
				<div v-show="tabIdx === 1" class="lists">
					<ul v-if="notice.length > 0">
						<li v-for="(list, index) in notice" :key="index" @click="goDetail(list.id)">
							<div class="card">
								<div class="card-head"><img :src="list.pic" alt="">
									<h4>{{list.title}}</h4>
								</div>
								<div class="card-content" v-html="list.content"></div>
								<div class="card-bottom">
									<div class="view">
										<img class="icon-view" src="../assets/images/icons/icon-view.png" alt=""><span>{{list.viewNum}}</span>
									</div>
									<div class="like">
										<img class="icon-like" src="../assets/images/icons/icon-like.png" alt=""><span>{{list.likeNum}}</span>
									</div>
								</div>
							</div>
						</li>
					</ul>
					<div v-else>暂无消息提示</div>
				</div>
				<div v-show="tabIdx === 2" class="set">
					<ul>
						<li>
							<div class="change-item"><img src="../assets/images/avatar.png" alt="" class="avatar_s">
								<h3 class="username">{{username}}</h3>
							</div>
							<button class="changeBtn"></button>
						</li>
						<li>
							<div class="change-item">安全手机{{formatPhone(mobile)}}</div>
							<el-button class="changeBtn" type="primary" icon="el-icon-edit" circle @click="setMobileFormVisible = true"></el-button>
						</li>
						<li>
							<div class="change-item">账号密码{{password}}</div>
							<el-button class="changeBtn" type="primary" icon="el-icon-edit" circle @click="setPwdFormVisible = true"></el-button>
						</li>
						<li>
							<div class="change-item">微信号{{weixin}}</div>
							<el-button class="changeBtn" type="primary" icon="el-icon-edit" circle @click="setWeixinFormVisible = true"></el-button>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 修改手机号 -->
		<el-dialog title="手机号设置" :visible.sync="setMobileFormVisible">
			<el-form :model="setMobileForm" :rules="setMobileFormRules" ref="setMobileForm">
				<el-form-item label="手机号" prop="mobile" :label-width="formLabelWidth">
					<el-input v-model="setMobileForm.mobile" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth" prop="password">
					<el-input type="password" v-model="setMobileForm.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="短信验证码" prop="code" :label-width="formLabelWidth">
					<el-input class="validCode-input" v-model="setMobileForm.code"></el-input>
					<el-button type="primary" @click="sendMsg" :disabled="isDisabled">{{validCodeState}}</el-button>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="setMobileFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirmMobile">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 设置密码 -->
		<el-dialog title="密码设置" :visible.sync="setPwdFormVisible">
			<el-form ref="form" :model="form" :rules="rules" label-width="80px" status-icon>
				<el-form-item prop="oldpass" label="旧密码">
					<el-input v-model="form.oldpass" type="password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item prop="pass" label="新密码">
					<el-input v-model="form.pass" type="password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item prop="checkPass" label="确认密码">
					<el-input v-model="form.checkPass" type="password" placeholder="请再次输入密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit('form')">确定</el-button>
					<el-button @click="onCancle('form')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import {
		mapGetters
	} from 'vuex'

	import {localUser} from '../store/functions.js'
	export default {
		name: "usercenter",
		data() {
			var checkPhone = (rule, value, callback) => {
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
			var validatePassword = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'))
				} else {
					callback()
				}
			}
			var checkCode = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('验证码不能为空'))
				} else {
					callback()
				}
			}

			var validateOldPass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.form.checkPass !== '') {
						this.$refs.form.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form.pass) {
					callback(new Error('两次输入的密码不一致'));
				} else {
					callback();
				}
			};
			return {
				tabIdx: 0,
				notice: [],
				password: "",
				collectInfo: [],

				setMobileFormVisible: false,
				waitTime: 60,
				setMobileForm: {
					mobile: '',
					password: '',
					code: ''
				},
				validCodeState: '获取验证码',
				setMobileFormRules: {
					mobile: [{
						validator: checkPhone,
						trigger: 'blur'
					}],
					password: [{
						validator: validatePassword,
						trigger: 'blur'
					}],
					code: [{
						validator: checkCode,
						trigger: 'blur'
					}],
				},

				setPwdFormVisible: false,
				time: 60,
				isDisabled: false,
				formLabelWidth: '100px',


				form: {
					oldpass: '',
					pass: '',
					checkPass: ''
				},
				rules: {
					oldpass: [{
						validator: validateOldPass,
						trigger: 'blur'
					}],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				}
			}
		},
		created: function() {
			// this.mobile = this.formatPhone(this.mobile)
			this.$http.get("/api/user/collectList?uid=" + this.id).then(response => {
				var res = response.data;
				console.log(res);
				if (res.code === 200) {
					this.pageCount = res.data.pageSize;
					if (res.data.result.length > 0) {
						this.collectInfo = res.data.result;
					}
				}
			})
		},
		methods: {
			onSubmit(formName) {
				const self = this;
				let formData = {
					old: self.form.oldpass,
					new: self.form.pass,
					userId: self.id
				};
				self.$refs[formName].validate((valid) => {
					if (valid) {
						self.$http.post('/api/user/modifyPwd', formData).then(function(response) {
							if (response.data.code == 0) {
								self.$message({
									message: response.data.msg,
									type: 'error'
								});
							} else if (response.data.code == 200) {
								self.setPwdFormVisible = false
								self.$message({
									message: response.data.msg,
									type: 'success'
								});
								localUser.clear()
								localStorage.removeItem('hasLogin')
								self.$refs[formName].resetFields();
								self.$router.push('/login')
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			onCancle() {
				this.$refs[formName].resetFields();
				this.$router.push('/userCenter');
			},
			confirmMobile: function() {
				this.$http.get('/api/user/lostPwd?mobile=' + this.setMobileForm.mobile + '&code=' + this.setMobileForm.code +
					'&pwd=' + this.setMobileForm.password).then(
					response => {
						var data = response.data
						console.log(data)
						if (data.code == 200) {
							this.setMobileFormVisible = false
							this.$message({
								showClose: true,
								message: '手机号修改成功'
							});
						}
					})
			},
			sendMsg() {
				this.$refs.setMobileForm.validateField('mobile', valid => {
					if (valid !== '') {
						this.setMobileFormRules.mobile;
					} else {
						let _this = this;
						_this.getCode(this.setMobileForm.mobile)
						_this.isDisabled = true;
						let interval = window.setInterval(function() {
							_this.validCodeState = _this.time + '后重新发送';
							--_this.time;
							if (_this.time < 0) {
								_this.validCodeState = "重新发送";
								_this.time = 60;
								_this.isDisabled = false;
								window.clearInterval(interval);
							}
						}, 1000);
					}
				});
			},
			getCode: function(mobile) {
				this.$http.post('/api/code/getCode?mobile=' + mobile)
					.then(response => {

					}).catch(response => {
						console.log(response)
					})
			},
			getMessage: function() {
				this.tabIdx = 1
				this.$http
					.get("/api/user/noticeList?uid=" + this.uid)
					.then(response => {
						var data = response.data;
						if (data.code === 200) {
							console.log(data.data.result);
							this.notice = data.data.result;
						}
					});
			},
			formatPhone(phone) {
				return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
			}
		},
		computed: {
			...mapGetters(['username', 'avatar', 'mobile', 'weixin', 'id'])
		},
	};
</script>
<style scoped>
	button {
		border: none;
	}

	.user-center .user-info {
		background: #fff;
		overflow: hidden;
		line-height: 80px;
	}

	.user-info .avatar {
		float: left;
		width: 80px;
		height: 80px;
		margin-right: 20px;
	}

	.user-info .username {
		font-size: 30px;
		color: #666;
		float: left;
	}

	.tab {}

	.tab .nav {
		overflow: hidden;
	}

	.tab .nav li {
		float: left;
		height: 60px;
		line-height: 60px;
	}

	.nav li a {
		color: #666;
		font-size: 14px;
	}

	.nav li a.cur {
		border-bottom: 1px solid #0c87ff;
		color: #0c87ff;
	}

	.lists ul {
		overflow: hidden;
	}

	.lists li {
		float: left;
		width: calc((100% - 80px) / 2);
		margin: 20px;
	}

	@media screen and (max-width: 767px) {
		.lists li {
			width: 100%;
		}
	}

	/* @media screen and (min-width: 768px) and (max-width: 991px) {
  .lists li {
    width: 50%;
  }
}

@media screen and (min-width: 992px) and (max-width: 1299px) {
  .lists li {
    width: calc(100% / 3);
  }
}
@media screen and (min-width: 1300px) {
  .lists li {
    width: 25%;
  }
} */

	.lists li .card {
		background: #fff;
		padding: 15px;
		border-radius: 6px;
		cursor: pointer;
	}

	.card-head {
		overflow: hidden;
	}

	.card-head img {
		width: 26px;
		height: 26px;
		float: left;
		border-radius: 4px;
	}

	.card-head h4 {
		float: left;
		font-size: 10px;
		color: #333;
		margin-left: 10px;
		height: 26px;
		line-height: 26px;
	}

	.card-content {
		font-size: 12px;
		color: #666;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		margin: 10px auto 15px;
	}

	.card-bottom {
		font-size: 12px;
		color: #999;
		overflow: hidden;
	}

	.card-bottom .view {
		float: left;
	}

	.card-bottom .like {
		float: right;
	}

	.card-bottom img {
		margin-right: 4px;
	}

	.set {
		padding: 0 40px 50px;
		background: #fff;
		margin: 20px;
	}

	.set ul li {
		border-bottom: 1px solid #cccccc;
		position: relative;
	}

	.set ul li:first-child {
		overflow: hidden;
		padding: 30px 0;
	}

	.set ul li:first-child img {
		float: left;
		width: 60px;
		height: 60px;
	}

	.set ul li:first-child h3 {
		float: left;
		font-size: 14px;
		color: #666;
		line-height: 60px;
		margin-left: 20px;
	}

	.set ul li:not(:first-child) {
		height: 90px;
		line-height: 90px;
	}

	.changeBtn {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.el-form .el-input {
		width: 60%;
	}
</style>

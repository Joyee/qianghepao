<template>
	<div class="detail">
		<div class="title">
			<h3>{{title}}</h3>
		</div>
		<div class="detail-container">
			<div class="icon"><img :src="data.pic" alt=""></div>
			<div class="detail-right">
				<h3>{{data.title}}</h3>
				<div class="detail-content" v-html="data.content"></div>
				<div class="row">
					<ul class="links">
						<li v-for="(link, index) in data.link_arr" :key="index"><i><img src="../assets/images/icons/icon-globe.png" alt=""></i><a
							 :href="link">{{link}}</a></li>
					</ul>

					<ul class="icons">
						<li v-if="biyong !== ''"><a class="czs-bitcoin" :href="biyong"></a></li>
						<li v-if="facebook !== ''"><a v-bind:href="facebook" class="czs-facebook"></a></li>
						<li v-if="qq !== ''"><a v-bind:href="qq" class="czs-qq"></a></li>
						<li v-if="weibo !== ''"><a v-bind:href="weibo" class="czs-weibo"></a></li>
						<li v-if="wechat !== ''"><a v-bind:href="wechat" class="czs-weixin"></a></li>
						<li v-if="telegram !== ''"><a v-bind:href="telegram" class="czs-telegram"></a></li>
						<li v-if="twitter !== ''"><a v-bind:href="twitter" class="czs-twitter"></a></li>
					</ul>
				</div>
				<div class="detail-bottom" v-if="id !== ''">
					<div class="font-icon" @click="collect"><i :class="collected ? 'czs-star' : 'czs-star-l'"></i>100</div>
					<div class="font-icon" @click="viewEvent"><i :class="viewed ? 'czs-eye' : 'czs-eye-l'"></i>{{data.read_num}}</div>
					<div class="font-icon" @click="likeEvent"><i :class="like ? 'czs-thumbs-up':'czs-thumbs-up-l'"></i>{{data.like_num}}</div>
				</div>
			</div>
		</div>
		<download :info="info"></download>
	</div>
</template>
<script>
	import {
		mapGetters
	} from 'vuex'
	import Download from "../components/Download.vue"

	export default {
		name: "Detail",
		components: {
			Download
		},
		data() {
			return {
				data: {},
				title: "交易所",
				info: {},
				biyong: "",
				facebook: "",
				qq: "",
				telegram: "",
				twitter: "",
				wechat: "",
				weibo: "",
				type: "",
				collected: false,
				viewed: false,
				like: false,
				goodId: ""
			};
		},
		created: function() {
			let that = this;
			if (localStorage.getItem("collected") == "true") {
				that.collected = true;
			} else {
				that.collected = false;
			}
			if (localStorage.getItem("viewed") == "true") {
				that.viewed = true;
			} else {
				that.viewed = false;
			}
			if (localStorage.getItem("like") == "true") {
				that.like = true;
			} else {
				that.like = false;
			}
			that.goodId = that.$route.params.id
			that.$http.get("/api/exchange/exchangeDetail?id=" + that.goodId).then(res => {
				if (res.data.code == 200) {
					var data = res.data.data;
					var social_account = data.social_account;
					that.type = data.type;
					data.pic = "http://www.qianghepao.com" + data.pic;
					this.data = data;
					this.info = data.other_info;

					this.biyong = social_account.biyong;
					this.facebook = social_account.facebook;
					this.qq = social_account.qq;
					this.telegram = social_account.telegram;
					this.twitter = social_account.twitter;
					this.wechat = social_account.wechat;
					this.weibo = social_account.weibo;
				}
			});
		},
		methods: {
			// 收藏
			collect: function() {
				if (this.id !== "") {
					var that = this;
					if (!that.collected) {
						let url =
							"/api/userHandle/collect?id=" +
							that.goodId +
							"&uid=" +
							that.id +
							"&type=" +
							that.type;
						this.$http.post(url).then(response => {
							if (response.data.code === 200) {
								that.collected = true;
								localStorage.setItem("collected", true);
							}
						});
					} else {
						let url = "/api/userHandle/unCollect?id=" + that.goodId + "&uid=" + that.id + "&type=" + that.type
						that.$http.post(url).then(response => {
							if (response.data.code == 200) {
								that.collected = false
								localStorage.setItem("collected", false)
							}
						})
					}
				} else {
					this.$router.push('/login')
				}
			},
			// 点赞
			likeEvent: function() {
				let that = this;
				if (!that.id) {
					that.$router.push('/login')
				} else {
					let url = "/api/userHandle/giveLike?id=" + that.goodId + "&uid=" + that.id;
					if (!that.like) {
						this.$http.post(url).then(response => {
							if (response.data.code === 200) {
								that.like = true;
								localStorage.setItem("like", true);
							}
						});
					} else {
						that.like = false;
						localStorage.setItem("like", false);
					}
				}
			},
			viewEvent: function() {
				let that = this;
				if (that.id !== "") {
					let url = "/api/userHandle/giveReview?id=" + that.goodId + "&uid=" + that.id;
					if (!that.viewed) {
						this.$http.post(url).then(response => {
							if (response.data.code === 200) {
								that.viewed = true;
								localStorage.setItem("viewed", true);
							}
						});
					} else {
						that.viewed = false;
						localStorage.setItem("viewed", false);
					}
				} else {
					that.$router.push('/login')
				}
			}
		},
		computed: {
			...mapGetters(['id'])
		},
	};
</script>
<style scoped>
	a {
		text-decoration: none;
	}

	.row {
		overflow: hidden;
	}

	.detail-container {
		margin: 20px 20px 40px;
		background: #fff;
		padding: 20px;
		border-radius: 4px;
		overflow: hidden;
	}

	.icon {
		float: left;
		width: 12%;
	}

	.icon img {
		width: 66px;
		height: 66px;
		border-radius: 4px;
		margin-right: 14px;
	}

	.detail-right {
		width: 88%;
		float: left;
	}

	.detail-right h3 {
		font-size: 18px;
		color: #0c87ff;
	}

	.detail-content {
		font-size: 12px;
		color: #666666;
		line-height: 20px;
		margin-bottom: 15px;
	}

	.links {
		overflow: hidden;
		float: left;
		margin-right: 40px;
	}

	.links li {
		float: left;
	}

	.links li i {
		float: left;
		width: 24px;
		height: 24px;
		border-radius: 4px;
		background: #0c87ff;
	}

	.links li i img {
		display: block;
		width: 16px;
		height: 16px;
		margin: 4px auto;
	}

	.icons {
		float: left;
		overflow: hidden;
	}

	.icons li {
		float: left;
		width: 24px;
		height: 24px;
		line-height: 24px;
		text-align: center;
		background: #666666;
		margin-right: 10px;
		border-radius: 4px;
	}

	.icons li a {
		color: #fff;
		font-size: 14px;
	}

	.detail-bottom {
		float: right;
		overflow: hidden;
		margin-top: 40px;
	}

	.font-icon {
		float: left;
		font-size: 12px;
		color: #999;
		margin-left: 55px;
		cursor: pointer;
	}

	.font-icon i {
		margin-right: 5px;
	}
</style>

<template>
	<div class="sidebar">
		<img class="logo" src="../assets/images/logo.png" alt="">
		<ul class="nav side-menu">
			<li v-for="(menu, index) in menus" @click="toggleMenu(menu, index)" :key="index" :data-link="menu.link" :class="{active:istrue === index}">
				<a href="javascript:;"><i class="czs" v-bind:class="menu.pic"></i>{{menu.title}}
				<span class="icon" v-show="!menu.link" v-bind:class="menu.class ? 'fa-chevron-down' : 'fa-chevron-right'"></span></a>
				<ul class="nav child_menu slide" v-on:click.stop>
					<router-link v-for="childMenu in menu.childMenus" v-bind:key="childMenu.title" class="slide-item" :to="childMenu.link" tag="li" active-class="current-page">
						<a>{{childMenu.title}}</a>
					</router-link>
				</ul>
			</li>
		</ul>
		<div class="weixin">
			<img src="../assets/images/xiaozhushou.jpg" alt="">
			<p>微信公众号</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Sidebar',
		data() {
			return {
				menus: [],
				istrue: 0
			}
		},
		mounted: function () {
			this.$http.get('/api/menu/menuList').then(response => {
				var data = []
				if (response.data.code == 200) {
					data = response.data.data
					data.sort(compareUp('sort'))
					this.menus = data
					function compareUp(propertyName) {
						if ((typeof data[0][propertyName]) !== 'number') {
							return function(object1, object2) {
								var value1 = object1[propertyName]
								var value2 = object2[propertyName]
								return value1.localeCompare(value2)
							}
						} else {
							return function(object1, object2) {
								var value1 = object1[propertyName]
								var value2 = object2[propertyName]
								return value1 - value2
							}
						}
					}
				}
			}).catch(function (err) {
				console.log(err)
			})
			
		},
		methods: {
			toggleMenu (menu, index) {
				if (menu.link) {
					this.istrue = index
					this.$router.push(menu.link)
				}
			}
		}
	}
</script>

<style scoped>
.sidebar {
	position: fixed;
	left: 0;
	top: 0;
	bottom: -100px;
	width: 230px;
	height: 100%;
	background: #171717;
	z-index: 200;
}

.logo {
	display: block;
	width: 180px;
	height: 60px;
	margin: 62px auto;
}
.nav li {
	height: 50px;
	line-height: 50px;
}
.nav li a {
	color: #d7d7d7;
	text-decoration: none;
	display: block;
	font-size: 14px;
	text-align: center;
}

.active {
	background: #fff;
	color: #333;
}
.nav .active a {
	color: #333;
}

.weixin {
	width: 100px;
    margin: 60px auto 0;
    cursor: pointer;
}

.weixin img {
    width: 100%;
    height: 100%;
}

.weixin p {
    font-size: 12px;
    color: #c3c3c3;
    text-align: center;
    padding: 10px 0;
    margin-bottom: 26px;
}
</style>
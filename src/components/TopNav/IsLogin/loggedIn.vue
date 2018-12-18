<template>
	<div class="loggedIn">
		<img :src="avatar" class="avatar">
		<div>
			<a href="javascript:;" @click="goSelfCenter">{{username}}</a>
			<a href="javascript:;" @click="logout">退出</a>
		</div>
	</div>
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex'
	export default {
		name: 'loggedIn',
		data () {
			return {
			}
		},
		created: function () {
			
		},
		methods: {
			logout () {
				this.$store.dispatch('logout').then(() => {
					this.$router.push({ path: '/exchange' })
				})
			},
			goSelfCenter() {
				this.$router.push('/userCenter')
			}
		},
		computed: {
			...mapGetters(['username', 'avatar'])
		},
		mounted: function () {
			
		}
}
</script>

<style scoped>
  .loggedIn {
    height: 70px;
  }
  .avatar {
    margin: 14px 0;
    height: 42px;
    width: 42px;
    border: 1px solid lightgrey;
    border-radius: 50%;
  }
  .loggedIn > div {
    margin-left: 36px;
    margin-top: -48px;
  }
  a {
    margin-left: 24px;
  }
</style>
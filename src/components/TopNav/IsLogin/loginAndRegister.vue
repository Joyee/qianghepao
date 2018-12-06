<template>
	<div class="login-register">
		<ul>
			<router-link to="/login" tag="li">登录</router-link>
			<router-link to="/register" tag="li">注册</router-link>
		</ul>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'loginAndRegister',
		data () {
			return {}
		}
	}
</script>
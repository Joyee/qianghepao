<template>
	<div class="top-nav">
		<ul>
			<router-link to="/home" tag="li">首页</router-link>
		</ul>
		<component :is="login ? 'loggedIn' : 'loginAndRegister'"></component>
	</div>
</template>

<script type="text/javascript">
	import loggedIn from './IsLogin/loggedIn'
	import loginAndRegister from './IsLogin/loginAndRegister'
	import {mapGetters} from 'vuex'
	export default {
		name: 'topNav',
		data () {
			return {}
		},
		components: {
			loggedIn: loggedIn,
			loginAndRegister: loginAndRegister
		},
		computed: {
			...mapGetters(['login','username'])
		}
	}
</script>

<style>
	.top-nav {
    height: 70px;
    background: #fff;
    padding: 0 100px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    border-bottom: 1px solid #d3d3d3;
    box-shadow: 0 0 2px rgba(14, 14, 14, 0.2);
    transition: all .1s linear;
  }
  .top-nav li {
    float: left;
    line-height: 64px;
    text-align: center;
    padding: 3px 1em 0 1em;
    cursor: pointer;
    transition: all .1s linear;
  }
  .top-nav li:hover {
    color: #70bde0;
    border-bottom: 3px solid #70bde0;
  }
  .top-nav .router-link-active {
    color: #70bde0;
    border-bottom: 3px solid #70bde0;
  }
</style>
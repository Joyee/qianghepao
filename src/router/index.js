import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login/index'
import Register from '@/components/Register/index'
import Home from '@/pages/home'
import Exchange from '@/pages/exchange'
import Project from '@/pages/project'
import Invest from '@/pages/invest'
import Candy from '@/pages/candy'
import Learn from '@/pages/learn'
import GoodDetail from '@/pages/goodDetail'
import Projectdetail from '@/pages/projectdetail'
import About from '@/pages/about'
import Feedback from '@/pages/feedback'
import LearnDetail from '@/pages/learnDetail'
// import UserCenter from '@/pages/usercenter'
const usercenter = r => require.ensure([], () => r(require('../pages/userCenter')), 'usercenter')

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		redirect: '/exchange',
		name: 'Home',
		component: Home,
		children: [
			{
				path: '/exchange',
				name: 'Exchange',
				component: Exchange,
			},
			{
				path: '/project',
				name: 'Project',
				component: Project,
			},
			{
				path: '/invest',
				name: 'Invest',
				component: Invest,
			},
			{
				path: '/candy',
				name: 'Candy',
				component: Candy
			},
			{
				path: '/learn',
				name: 'Learn',
				component: Learn
			},
			{
				path: '/detail/:id',
				name: 'Detail',
				component: GoodDetail,
				props: true
			},
			{
				path: '/projectdetail/:id',
				name: 'Projectdetail',
				component: Projectdetail,
				props: true
			},
			{
				path: '/learnDetail/:type/:id',
				name: 'LearnDetail',
				component: LearnDetail,
				props: true,
			},
			{
				path: '/about',
				name: 'About',
				component: About
			},
			{
				path: '/feedback',
				name: 'feedback',
				component: Feedback,
				meta: {
					requireAuth: true  //添加该字段，表示进入这个路由需要登录
				}
			},
		]
	},
	{
		path: '/usercenter',
		name: 'usercenter',
		component: usercenter,
// 		meta: {
// 			requireAuth: true  //添加该字段，表示进入这个路由需要登录
// 		}
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/register',
		name: 'Register',
		component: Register
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router

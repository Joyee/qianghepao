import router from './router'
import store from './store'
import axios from 'axios'
import Vuex from 'vuex'

router.beforeEach((to,form,next) =>{
	var hasLogin  = localStorage.getItem('hasLogin')
	console.log(hasLogin)
	//解决方案：
	//1.登录以后只在cookie存储登录状态如：hasLogin:1
	//2.在此处判断如果hasLogin存在且value=1，就去后台获取登录用户的信息。存入vuex，使用vuex维护登录数据，不存cookie用户信息，以保持用户数据及时更新。
	// console.log('TODO')
	//if (to.matched.some(record => record.meta.requireAuth)) {
		console.log('/userCenter'.indexOf(to.path) )
		if (hasLogin) {
			store.dispatch('getUserIn').then(()=>{
				next({...to})
			})
			next()
		} else if('/feedback'.indexOf(to.path) == 0){//访问黑名单
			next('/login')
		}else{
			next()
		}
})

router.afterEach(()=>{

})
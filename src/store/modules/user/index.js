import {localUser} from '../../functions'
import {login, logout,getUserInfo} from '../../../api/login'

const state = {
	user: localUser.get() || {
		id: "",
		username: '',
		avatar:'',
		mobile: '',
		weixin: ''
	},
	login: localUser.get() !== '',
	id: "",
	username: '',
	avatar:'',
	mobile: '',
	weixin: ''
}

const getters = {
	user: state => state.user,
	login: state => state.login,
	id: state => state.id,
	username: state => state.username,
	avatar: state => state.avatar,
	mobile: state => state.mobile,
	weixin: state => state.weixin
}

const mutations = {
	SET_LOGIN_STATE: (state, loginState) => {
		state.login = loginState
	},
	SET_ID: (state, id) => {
		state.id = id
	},
	SET_USERNAME: (state, username) => {
		state.username = username
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_MOBILE: (state, mobile) => {
		state.mobile = mobile
	},
	SET_WEIXIN: (state, weixin) => {
		state.weixin = weixin
	},
	LOGOUT_USER: state => {
		state.user = {
			id: "",
			username: '',
			avatar: ''
		}
		state.login = false
	}
}

const actions = {
	login ({commit, state}, userInfo) {
		return new Promise((resolve, reject) => {
			login(userInfo).then(response => {
				var result = response.data
				if (result.code == 200) {
					localStorage.setItem('hasLogin', 1)
					commit('SET_ID', result.data.id)
					commit('SET_USERNAME', result.data.nickname)
					commit('SET_AVATAR', result.data.profile_photo)
					commit('SET_LOGIN_STATE', true)
					localUser.setWithTime(state.user)
					resolve()
				} else {
					reject(result.msg)
				}
				
			}).catch(error => {
				reject(error)
			})
		})
	},
	logout ({commit, state}) {
		return new Promise((resolve, reject) => {
			logout(state.user.id).then((response) => {
				console.log(response)
				var result = response.data
				if (result.code == 200) {
					commit('SET_LOGIN_STATE', false)
					localUser.clear()
					localStorage.removeItem('hasLogin')
					resolve()
				} else {
					reject(result.msg)
				}
			}).catch(error => {
				reject(error)
			})
		})
	},
	getUserIn({commit, state}) {
		return new Promise((resolve, reject) => {
			getUserInfo().then(response => {
				var data = response.data.data
				commit('SET_ID', data.id)
				commit('SET_USERNAME', data.nickname)
				if (data.profile_photo == "") {
					data.profile_photo = "/static/image/default_avatar.png"
				}
				commit('SET_AVATAR', data.profile_photo)
				commit('SET_MOBILE', data.mobile)
				commit('SET_WEIXIN', data.wechat)
			})
		})
	}
}

const userModule = {
	state,
	getters,
	actions,
	mutations
}

export default userModule





















import {localUser} from '../../functions'
import {login, logout,getUserInfo} from '../../../api/login'

const state = {
	user: localUser.get() || {
		id: undefined,
		username: '',
		avatar: ''
	},
	login: localUser.get() !== '',
	username:'',
	avatar:''
}

const getters = {
	user: state => state.user,
	login: state => state.login,
	id: state => state.user.id,
	username: state => state.username,
	avatar: state => state.avatar
}

const mutations = {
	SET_LOGIN_STATE: (state, loginState) => {
		state.login = loginState
	},
	SET_ID: (state, id) => {
		state.user.id = id
	},
	SET_USERNAME: (state, username) => {
		state.username = username
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	LOGOUT_USER: state => {
		state.user = {
			id: undefined,
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
					commit('SET_AVATAR', result.data.avatar)
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
					commit('LOGOUT_USER')
					localUser.clear()
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
				commit('SET_USERNAME', data.nickname)
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





















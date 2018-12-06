import axios from 'axios'

export const login = params => {
	return axios.post('/api/user/login', params)
}

export const logout = params => {
	return axios.get('/api/User/logout', params)
}

export const getUserInfo = params =>{
	return axios.get('/api/user/getUserInfo', params)
}
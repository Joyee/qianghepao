import axios from 'axios'

export const register = params => {
	return axios.post('/api/user/register', params)
}
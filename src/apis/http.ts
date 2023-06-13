import axios from 'axios'

const http = axios.create({ baseURL: 'http://localhost:8080', timeout: 5 * 1000 })

http.interceptors.request.use((config) => {
	// todo
	return config
})

// todo
http.interceptors.response.use(
	(res) => {
		console.log(res)
		return res
	},
	(error) => {
		console.log(error)
		return error
	}
)

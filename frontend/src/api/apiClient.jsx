import axios from 'axios'

const api = axios.create({
    baseURL: 'https://pokemon-trainer-management.onrender.com/api',
    timeout: 10000,  // 24h
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${ token }`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            window.location.href = '/login'
            return Promise.reject(new Error('Login Expired. Please Login Again!'))
        }

        if (error.response?.status === 403) {
            return Promise.reject(new Error('Access Denied'))
        }

        const message = error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            'Request Failed'
        return Promise.reject(new Error(message))
    },
)

export default api;
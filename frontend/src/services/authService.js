import api from '../api/apiClient.jsx'

export const loginApi = (credentials) => api.post('auth/login', credentials)


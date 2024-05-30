import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
const axiosJWT = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})
const refreshToken = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}` + 'auth/token',
            {
                withCredentials: true,
            }
        )
        const accessToken = response.data.accessToken
        localStorage.setItem('access_token', accessToken)
        return accessToken
    } catch (error) {
        throw new Error('Failed to refresh token')
    }
}
axiosJWT.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem('access_token')
        let decoded = jwtDecode(token)
        const expToken = decoded.exp
        if (token && expToken) {
            const currentDate = new Date()
            if (expToken * 1000 < currentDate.getTime()) {
                try {
                    token = await refreshToken()
                } catch (error) {
                    localStorage.removeItem('access_token')
                    window.location.href = '/login'
                    return Promise.reject(error)
                }
            }
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosJWT

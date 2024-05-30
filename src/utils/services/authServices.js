import axios from 'axios'

export const login = async (data) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}` + 'auth/login',
            data,
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const register = async (data, navigate, setErrorMessage) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}` + 'auth/register',
            data
        )
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
        if (error.response) {
        }
    }
}
export const logout = async () => {
    try {
        const response = axios.delete(
            `${import.meta.env.VITE_API_URL}` + 'auth/logout',
            {
                withCredentials: true,
            }
        )
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

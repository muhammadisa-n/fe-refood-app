import axiosJWT from '@utils/services/axiosJWT.js'

export const getUser = async () => {
    try {
        const response = await axiosJWT.get('users/get')
        return response.data.user
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const updateUser = async (data) => {
    try {
        const response = await axiosJWT.put('users/update', data)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

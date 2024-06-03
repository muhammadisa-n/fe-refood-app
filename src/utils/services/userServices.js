import axiosJWT from '@utils/services/axiosJWT.js'

export const getUser = async () => {
    try {
        const response = await axiosJWT.get('user/get')
        return response.data.user
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const updateUser = async (data) => {
    try {
        const response = await axiosJWT.put('user/update', data)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

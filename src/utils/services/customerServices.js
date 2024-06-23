import axiosJWT from '@utils/services/axiosJWT.js'

export const getAllCarts = async () => {
    try {
        const response = await axiosJWT.get('/customer/carts')
        return response.data.carts
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const addCart = async (data) => {
    try {
        const response = await axiosJWT.post('/customer/carts', data)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const deleteCart = async (productId) => {
    try {
        const response = await axiosJWT.delete('/customer/carts/' + productId)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

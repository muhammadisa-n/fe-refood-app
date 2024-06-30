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

export const createOrder = async (data) => {
    try {
        const response = await axiosJWT.post('/customer/orders', data)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const getAllOrder = async () => {
    try {
        const response = await axiosJWT.get('/customer/orders')
        return response.data.orders
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const getDetailOrder = async (id) => {
    try {
        const response = await axiosJWT.get(`/customer/orders/${id}`)
        return response.data.order
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const UpdateOrderTransaction = async (id, data) => {
    try {
        const response = await axiosJWT.put(`/customer/orders/${id}`, data)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

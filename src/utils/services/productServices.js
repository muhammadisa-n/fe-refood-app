import axiosJWT from '@utils/services/axiosJWT.js'
import axios from 'axios'

export const getAllProducts = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}` + 'products'
        )
        return response.data.product
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const getProductById = async (id) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}` + `products/${id}`
        )
        return response.data.product
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

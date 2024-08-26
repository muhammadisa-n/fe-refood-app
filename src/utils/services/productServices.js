import axios from 'axios'

export const getAllProducts = async (page, take, search, seller, category) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}` + 'products',
            { params: { page, take, search, seller, category } }
        )
        return response.data
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

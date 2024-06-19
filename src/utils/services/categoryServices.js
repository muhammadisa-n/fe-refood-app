import axios from 'axios'

export const getAllCategory = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}` + 'category'
        )
        return response.data.categories
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

import axiosJWT from '@utils/services/axiosJWT.js'

export const getAllProducts = async (page, size, search) => {
    try {
        const response = await axiosJWT.get('admin/products', {
            params: { page, size, search },
        })
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const getAllSellers = async (page, size, search) => {
    try {
        const response = await axiosJWT.get('admin/sellers', {
            params: { page, size, search },
        })
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const getAllCategory = async (page, size, search) => {
    try {
        const response = await axiosJWT.get('admin/category', {
            params: { page, size, search },
        })
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const activateProduct = async (id, status) => {
    try {
        const response = axiosJWT.patch(`admin/activate/products/${id}`, {
            is_active: status,
        })
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const activateSeller = async (id, status) => {
    try {
        const response = axiosJWT.patch(`admin/activate/sellers/${id}`, {
            is_active: status,
        })
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const countProduct = async () => {
    try {
        const response = await axiosJWT.get('admin/count-products')
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const countSeller = async () => {
    try {
        const response = await axiosJWT.get('admin/count-sellers')
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const countCustomer = async () => {
    try {
        const response = await axiosJWT.get('admin/count-customers')
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const createCategory = async (data) => {
    try {
        const response = await axiosJWT.post('admin/category', data)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const getDetailCategory = async (id) => {
    try {
        const response = await axiosJWT.get('admin/category/' + id)
        return response.data.category
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const updateCategory = async (id, data) => {
    try {
        const response = await axiosJWT.put('admin/category/' + id, data)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const deleteCategory = async (id) => {
    try {
        const response = await axiosJWT.delete('admin/category/' + id)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

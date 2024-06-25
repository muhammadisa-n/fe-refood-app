import axiosJWT from '@utils/services/axiosJWT.js'

export const getAllProducts = async (page, take, search) => {
    try {
        const response = await axiosJWT.get('admin/products', {
            params: { page, take, search },
        })
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const getAllSellers = async (page, take, search) => {
    try {
        const response = await axiosJWT.get('admin/sellers', {
            params: { page, take, search },
        })
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const getAllCategory = async (page, take, search) => {
    try {
        const response = await axiosJWT.get('admin/categories', {
            params: { page, take, search },
        })
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const activateProduct = async (id, status) => {
    try {
        const response = axiosJWT.patch(`admin/products/${id}/activate`, {
            is_active: status,
        })
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const activateSeller = async (id, status) => {
    try {
        const response = axiosJWT.patch(`admin/sellers/${id}/activate`, {
            is_active: status,
        })
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}

export const countProduct = async () => {
    try {
        const response = await axiosJWT.get('admin/products/count')
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const countSeller = async () => {
    try {
        const response = await axiosJWT.get('admin/sellers/count')
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const countCustomer = async () => {
    try {
        const response = await axiosJWT.get('admin/customers/count')
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const createCategory = async (data) => {
    try {
        const response = await axiosJWT.post('admin/categories', data)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const getDetailCategory = async (id) => {
    try {
        const response = await axiosJWT.get('admin/categories/' + id)
        return response.data.category
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const updateCategory = async (id, data) => {
    try {
        const response = await axiosJWT.put('admin/categories/' + id, data)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
    }
}
export const deleteCategory = async (id) => {
    try {
        const response = await axiosJWT.delete('admin/categories/' + id)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error
        console.error(error)
    }
}

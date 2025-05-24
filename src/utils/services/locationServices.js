import axios from 'axios'

export const fetchProvinces = async () => {
    try {
        const response = await axios.get(
            'https://muhammadisa-n.github.io/api-wilayah-indonesia/api/provinces.json'
        )
        return response.data
    } catch (error) {
        throw error.response
            ? error.response.data
            : `Error Fetching Provinces, ${error}`
    }
}

export const fetchCities = async (provinceId) => {
    try {
        const response = await axios.get(
            `https://muhammadisa-n.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`
        )
        return response.data
    } catch (error) {
        throw error.response
            ? error.response.data
            : `Error Fetching Cities, ${error}`
    }
}

export const fetchDistricts = async (cityId) => {
    try {
        const response = await axios.get(
            `https://muhammadisa-n.github.io/api-wilayah-indonesia/api//districts/${cityId}.json`
        )
        return response.data
    } catch (error) {
        throw error.response
            ? error.response.data
            : `Error Fetching Districts, ${error}`
    }
}

export const fetchVillages = async (districtId) => {
    try {
        const response = await axios.get(
            `https://muhammadisa-n.github.io/api-wilayah-indonesia/api/villages/${districtId}.json`
        )
        return response.data
    } catch (error) {
        throw error.response
            ? error.response.data
            : `Error Fetching Villages, ${error}`
    }
}

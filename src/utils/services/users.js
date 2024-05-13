import axios from axios

export const getUsers = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}` + "users")}

import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Preset Authorization header
        'Content-Type': 'application/json', // Preset Content-Type header
    },
    timeout: 10000, // Optional: set a timeout for the requests
});

export default axiosInstance;
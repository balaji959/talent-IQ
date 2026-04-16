import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use the environment variable for the API base URL
  withCredentials: true, // Include cookies for authentication so clerk can check this user is authenticated or not

});
export default axiosInstance;
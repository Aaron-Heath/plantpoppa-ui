import axios from "axios";
import auth from "../../utils/auth";

const BACKEND_API = import.meta.env.VITE_REACT_APP_PLANT_API;

const authenticatedClient = axios.create({
    baseURL: BACKEND_API + "/api/"
})

authenticatedClient.interceptors.request.use(async config => {
    let token = auth.getToken()

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}, error => {
    return Promise.reject(error)
})

export default authenticatedClient
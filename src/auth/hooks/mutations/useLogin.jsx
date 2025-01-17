import axios from "axios";
import { useMutation } from "react-query";
import auth from "../../../utils/auth";

const BACKEND_API = import.meta.env.VITE_REACT_APP_PLANT_API;


const PATH_NAME = BACKEND_API + "/api/auth/login"

const login = (payload) => {
    return axios.post(PATH_NAME, payload);
}

export default function useLogin() { 
    return useMutation({
        mutationFn: login,
        mutationKey: ["login"],
        onSuccess: (result) => {
            auth.login(result.data.token)
        }
    })
}

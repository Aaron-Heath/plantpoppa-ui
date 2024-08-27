import auth from "../utils/auth";

const APP_JSON = "application/json";

const BACKEND_API = import.meta.env.VITE_REACT_APP_PLANT_API;

export const ADD_USER_PLANT = async(requestBody) => {
    const jwt = auth.getToken();
    if(!jwt) {
        auth.logout();
        return;
    }

    const reqPath = BACKEND_API + "/api/user-plant";
    const headers = {
        "AUTHORIZATION": "Bearer " + jwt,
        "Content-Type": APP_JSON
    }

    try {
        const response = await fetch(reqPath, {
            method:"POST",
            headers: headers,
            redirect:"follow",
            body: JSON.stringify(requestBody)
        });

        let data;
        if(response.status == 200) {
            data = await response.json();
        }

        return data;

    } catch (error) {
    }

}

export const GET_PLANTS = async () => {
    const jwt = auth.getToken();
    if(!jwt) {
        auth.logout();
        return;
    }

    const reqPath = BACKEND_API + "/api/plant/"

    const headers = {
        "AUTHORIZATION": "Bearer " + jwt
    }

    try {
        const response = await fetch(reqPath, {
            method:"GET",
            headers: headers,
            redirect:"follow"
        });

        let data;
        if(response.status == 200) {
            data = await response.json();
        }

        return data;

    } catch (error) {
    }

}

export const GET_USER_PLANT = async (uuid) => {
    const jwt = auth.getToken();
    if(!jwt) {
        auth.logout();
        return;
    }

    const reqPath = BACKEND_API + "/api/user-plant/" + uuid;
    const headers = {
        "Content-Type": APP_JSON,
        "AUTHORIZATION": "Bearer " + jwt
    }

    
    try {
        const response = await fetch(reqPath, {
            method:"GET",
            headers: headers,
            redirect:"follow"
        });

        let data;
        if(response.status == 200) {
            data = await response.json();
        }

        return data;

    } catch (error) {
    }

}

export const GET_USER_PLANTS = async () => {
    const jwt = auth.getToken();
    if(!jwt) {
        auth.logout();
        return;
    }
    

    const reqPath = BACKEND_API + "/api/user-plant";
    const headers = {
        "Content-Type": APP_JSON,
        "AUTHORIZATION": "Bearer " + jwt
    }

    try {
        const response = await fetch(reqPath, {
            method:"GET",
            headers: headers,
            redirect:"follow"
        });

        let data;
        if(response.status == 200) {
            data = await response.json();
        }

        return data;

    } catch (error) {
    }


}

export const GET_WATERINGS = async (plantUuid) => {
    const jwt = auth.getToken();
    if(!jwt) {
        auth.logout();
        return;
    }
    let response;

    const reqPath = BACKEND_API + "/api/user-plant/" + plantUuid + "/journal";

    try {
        response = await fetch(reqPath, {
            method:"GET",
            headers:{"Content-Type": "application/json"},
            redirect: "follow"
        });

        return response;
    } catch (error) {
        throw error;
    }
}

export const LOGIN = async (payload) => {
    let response;
    const reqPath = BACKEND_API + "/api/auth/login";


    try {
        response = await fetch(reqPath, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
            redirect: "follow"
        });

        return response;
    } catch (error) {
        throw error;
        
    }

}

export const REGISTER_USER = async (payload) => {
    let response;
    const reqPath = BACKEND_API + "/api/auth/register";
    
    try {
        response = await fetch(reqPath,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            redirect: "follow",
        });

        return response;
        
    } catch (error) {
        throw error;
    }
    
}

export const WATER_USER_PLANT = async (plantUuid) => {
    const jwt = auth.getToken();
    if(!jwt) {
        auth.logout();
        return;
    }
    

    const reqPath = BACKEND_API + "/api/user-plant/" + plantUuid + "/journal/water";
    const headers = {
        "Content-Type": APP_JSON,
        "AUTHORIZATION": "Bearer " + jwt
    }
    const body = {
        "entityUuid": plantUuid
    }

    try {
        const response = await fetch(reqPath, {
            method:"POST",
            headers: headers,
            redirect:"follow",
            body: JSON.stringify(body)
        });

        let data;
        if(response.status == 200) {
            data = await response.json();
        }


        return data;

    } catch (error) {
    }

}
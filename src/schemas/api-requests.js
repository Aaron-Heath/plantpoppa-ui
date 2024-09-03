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

export const DELETE_USER_PLANT = async (uuid) => {
    const jwt = auth.getToken();
    if(!jwt) {
        auth.logout();
        return;
    }

    const reqPath = BACKEND_API + "/api/user-plant/" + uuid;
    const headers = {
        "AUTHORIZATION": "Bearer " + jwt,
        "Content-Type": APP_JSON
    }

    try {
        const response = await fetch(reqPath, {
            method:"DELETE",
            headers: headers,
            redirect:"follow",
        });

        let data;
        if(response.status == 200) {
            data = await response.json();
        }

        return data;

    } catch (error) {
    }
}

export const EDIT_USER_PLANT = async (uuid, payload) => {
    const jwt = auth.getToken();
    if(!jwt) {
        auth.logout();
        return;
    }

    const reqPath = BACKEND_API + "/api/user-plant/" + uuid;
    const headers = {
        "AUTHORIZATION": "Bearer " + jwt,
        "Content-Type": APP_JSON
    }


    try {
        const response = await fetch(reqPath, {
            method:"PATCH",
            headers: headers,
            redirect:"follow",
            body: JSON.stringify(payload)
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
            return data;
        }

        data = await response.json();

        // Logs you out if the server determines the credentials are invalid.
        if(response.status === 401 && data.message.toLowerCase() === "invalid user credentials.") {
            auth.logout();
        }
        

    } catch (error) {
        const response = await error.json();
        console.log(response);
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

// --- USER API REQUESTS --- \\
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



export const ME = async() => {
    const jwt = auth.getToken();
    if(!jwt) {
        auth.logout();
        return;
    }

    const reqPath = BACKEND_API + "/api/user/me";
    const headers = {
        "Content-Type": APP_JSON,
        "AUTHORIZATION": "Bearer " + jwt
    }

    const response = await fetch(reqPath, {
        method:"GET",
        headers: headers,
        redirect:"follow"
    });

    let data;
    if(response.status == 200) {
        data = await response.json();
        return data;
    }
}
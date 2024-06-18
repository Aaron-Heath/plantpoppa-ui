import auth from "../utils/auth";

const APP_JSON = "application/json";

const PLANT_API = import.meta.env.VITE_REACT_APP_PLANT_API;

export const GET_PLANTS = async () => {
    const jwt = auth.getToken();
    if(!jwt) {
        auth.logout();
        return;
    }

    const reqPath = PLANT_API + "/api/plant/"

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
        console.log(error);
    }

}

export const GET_USER_PLANTS = async () => {
    const jwt = auth.getToken();
    if(!jwt) {
        auth.logout();
        return;
    }
    

    const reqPath = PLANT_API + "/api/user-plant";
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
        console.log(error);
    }


}

export const WATER_USER_PLANT = async (plantUuid) => {
    const jwt = auth.getToken();
    if(!jwt) {
        auth.logout();
        return;
    }
    

    const reqPath = PLANT_API + "/api/user-plant/" + plantUuid + "/journal/water";
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
            console.log("plant watered");
        }


        return data;

    } catch (error) {
        console.log(error);
    }

}
const APP_JSON = "application/json";

const PLANT_API = import.meta.env.VITE_REACT_APP_PLANT_API;

export const GET_USER_PLANTS = async (jwt) => {
    if(!jwt) {
        throw new Error("Authentication not provided.");
    }
    

    const reqPath = PLANT_API + "/api/plant/user-plant";
    const headers = {
        "Content-Type": APP_JSON,
        "AUTHORIZATION": "Bearer " + jwt
    }
    console.log(headers);

    try {
        const response = await fetch(reqPath, {
            method:"GET",
            headers: headers,
            redirect:"follow"
        });

        console.log(response);
        let data;
        if(response.status == 200) {
            data = await response.json();
        }

        console.log(data);
        return data;

    } catch (error) {
        console.log(error);
    }


}
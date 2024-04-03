import { jwtDecode } from "jwt-decode";
const decode = jwtDecode.default || jwtDecode;

class Auth {
    idTokenStore = "id_token";

    getUser() {
        try {
            return decode(this.getToken())
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    getToken() {
        return localStorage.getItem(this.idTokenStore);
    }


    login(idToken) {
        localStorage.setItem(this.idTokenStore, idToken);
    }

    logout() {
        localStorage.removeItem(this.idTokenStore);
    }
}

export default new Auth();
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

    getValidTokenElseLogout() {
        const token = localStorage.getItem(this.idTokenStore);
        if(!token || this.isTokenExpired(token)) {
            this.logout();

            return null;
        }

        return token;
    }


    login(idToken) {
        localStorage.setItem(this.idTokenStore, idToken);
    }

    logout() {
        localStorage.removeItem(this.idTokenStore);
    }

    // Checking token status
    loggedIn() {
        const token = this.getToken();
        // Return true if token exists and token is not expired
        return token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            // Decode token
            const decoded = decode(token);

            // Compare now to expirtion date
            if (decoded.exp > Date.now() / 1000) {
                return false;
            } else {
                this.logout();
                return true;
            }
        } catch (err) {
            console.error(err);
            return true;
        }
    }
}

export default new Auth();
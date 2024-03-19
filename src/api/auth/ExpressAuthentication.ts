import AuthAPI from "./FrontendAuthAPI";
import SERVER_URL_MAPPINGS from "../../mappings/env/SERVER_URL_MAPPINGS";
import UserAPI from "../user/UserAPI";

/**
 * Attempt to generalize app functions
 */
export default class ExpressAuthentication {
    // --- Conversions ---
    /**
     * Create auth api
     * 
     */
    authApi() {
        const api = new AuthAPI();
        
        return api;
    }
    
    /**
     * Go straight to user api
     * 
     */
    userApi(jwt: string): Promise<UserAPI> {
        const userApi = UserAPI.fromJWT(jwt);
        
        return userApi;
    }
}

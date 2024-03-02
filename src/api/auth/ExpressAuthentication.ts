import AuthAPI from "./FrontendAuthAPI";
import SERVER_URL_MAPPINGS from "../../mappings/env/SERVER_URL_MAPPINGS";

/**
 * Attempt to generalize app functions
 */
export default class ExpressAuthentication {
    url: string
    
    constructor() {
        this.url = SERVER_URL_MAPPINGS.AUTHENTICATION;
    }
    
    /**
     * The frontend uses '/auth2' as a base of the authentication api
     */
    setBaseUrl(url: string) {
        this.url = url;
        
        return this;
    }
    
    // --- Conversions ---
    /**
     * Create auth api
     * 
     * @param {Object} userData 
     */
    authApi(userData) {
        const api = new AuthAPI(userData);
        
        return api;
    }
    
    /**
     * Go straight to user api
     * 
     * TODO:
     * Behavior
     * 1) Should check if the user exist then login
     * 2) If the user doesn't exist, should create and login
     * However I don't need this right now, or do I?
     * Would remove unnecesary lines from code
     * 
     * @param {Object} userData User data 
     */
    userApi(userData) {
        throw Error("Conversion to 'UserAPI' not implemented");
    }
}

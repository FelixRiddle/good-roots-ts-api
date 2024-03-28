import AuthAPI from "./FrontendAuthAPI";
import UserAPI from "../user/UserAPI";

/**
 * Attempt to generalize app functions
 */
export default class ExpressAuthentication {
    debug: boolean;
    
    constructor(debug: boolean = false) {
        this.debug = debug;
    }
    
    // --- Conversions ---
    /**
     * Create auth api
     * 
     */
    authApi() {
        if(this.debug) {
            console.log(`Create FrontendAuthAPI`);
        }
        const api = new AuthAPI({
            debug: this.debug,
        });
        
        return api;
    }
    
    /**
     * Go straight to user api
     */
    userApi(jwt: string): Promise<UserAPI> {
        const userApi = UserAPI.fromJWT(jwt);
        
        return userApi;
    }
}

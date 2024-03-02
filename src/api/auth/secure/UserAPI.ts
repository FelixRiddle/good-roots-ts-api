import { AxiosInstance, AxiosResponse } from "axios";

import SERVER_URL_MAPPINGS from "../../../mappings/env/SERVER_URL_MAPPINGS";
import createAxiosInstance from "../../../createAxiosInstance";

// Types
import UserData from "../../../types/UserData";
import CreateResultType from "../../../types/server/authentication/auth/password/CreateResultType";
import DeleteResultType from "../../../types/server/authentication/user/DeleteResultType";
import DataResultType from "../../../types/server/authentication/user/DataResultType";

/**
 * User API
 * 
 * To handle protected endpoints
 */
export default class UserAPI {
    serverUrl: string;
    debug: boolean;
    instance: AxiosInstance;
    userData: UserData;
    
    /**
     * 
     * @param debug 
     */
    constructor(debug=false) {
        this.debug = debug;
    }
    
    // --- Constructors ---
    // Other kind of constructors that I see more suitable than the main
    /**
     * 
     * @param {AuthAPI} authApi 
     */
    static fromAuthenticatedAPI(authApi, debug=false) {
        const api = new UserAPI(debug);
        api.serverUrl = authApi.serverUrl;
        api.instance = authApi.instance;
        api.userData = authApi.userData;
        
        return api;
    }
    
    /**
     * Create UserAPI instance from a jwt token
     * 
     */
    static async fromJWT(token: string, debug=false) {
        const api = new UserAPI(debug);
        
        // Url
        const url = SERVER_URL_MAPPINGS.AUTHENTICATION;
        api.serverUrl = url;
        
        // Create instance
        api.instance = createAxiosInstance(url, "", token);
        
        // Get data
        const resData = await api.data();
        if(resData && resData.user) {
            api.userData = resData.user;
        }

        return api;
    }
    
    // --- User data ---
    /**
     * Get user data
     */
    async data(): Promise<DataResultType> {
        const endpoint = "/user/data";
        if(this.debug) {
            const fullUrl = `${this.serverUrl}${endpoint}`;
            console.log(`Complete url: ${fullUrl}`);
        }
        
        const res = await this.instance.get(endpoint)
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                return;
            });
        
        return res && res.data || undefined;
    }
    
    // --- User operations ---
    /**
     * Delete user
     */
    async delete(): Promise<DeleteResultType | undefined> {
        const endpoint = "/user/delete";
        if(this.debug) {
            const fullUrl = `${this.serverUrl}${endpoint}`;
            console.log(`Complete url: ${fullUrl}`);
        }
        
        const res: AxiosResponse | undefined = await this.instance.post(endpoint, this.userData)
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                return undefined;
            });
        
        return res && res.data || undefined;
    }
    
    // --- Email ---
    /**
     * Create new passsword
     * 
     * Second step of resetting password, with this step the user sets the new password.
     * 
     * @param {string} token Token to reset the password
     * @param {string} password 
     * @param {string} confirmPassword 
     */
    async createNewPassword(
        token: string,
        password: string,
        confirmPassword: string
    ): Promise<CreateResultType | undefined> {
        // Endpoint
        const endpoint: string = `/user/password/create/${token}`;

        // Debugging
        if(this.debug) {
            const fullUrl = `${this.serverUrl}${endpoint}`;
            console.log(`Complete url: ${fullUrl}`);
        }
        
        const res: AxiosResponse | undefined = await this.instance.post(endpoint, {
            password,
            confirmPassword
        })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.error(err);
                return undefined;
            });
        
        return res && res.data || undefined;
    }
}

import { AxiosInstance, AxiosResponse } from "axios";

import FrontendAuthAPI from "../auth/FrontendAuthAPI";
import SERVER_URL_MAPPINGS from "../../mappings/env/SERVER_URL_MAPPINGS";
import createAxiosInstance from "../../createAxiosInstance";

// Types
import CreateResultType from "../../types/server/authentication/auth/password/CreateResultType";
import DataResultType from "../../types/server/authentication/user/DataResultType";
import CompleteUserData from "../../types/CompleteUserData";
import PropertyAPI from "./property/PropertyAPI";
import DeleteUserResultType from "../../types/server/user/DeleteUserResultType";

/**
 * User API
 * 
 * To handle protected endpoints
 */
export default class UserAPI {
    token: string;
    serverUrl: string = "";
    debug: boolean = false;
    instance: AxiosInstance;
    #userData: CompleteUserData | undefined;
    
    /**
     * 
     * @param debug 
     */
    constructor(instance: AxiosInstance, token: string, debug=false) {
        this.token = token;
        this.debug = debug;
        
        this.instance = instance;
    }
    
    // --- Constructors ---
    // Other kind of constructors that I see more suitable than the main
    /**
     * 
     */
    static fromAuthenticatedAPI(authApi: FrontendAuthAPI, debug=false) {
        if(!authApi.token) throw Error("Token not found on AuthenticationAPI");
        
        const api = new UserAPI(authApi.instance, authApi.token, debug);
        api.serverUrl = authApi.serverUrl;
        
        return api;
    }
    
    /**
     * Use user data
     */
    async getUserData(): Promise<CompleteUserData> {
        if(!this.#userData) {
            const res = await this.data();
            this.#userData = res.user;
            
            if(!this.#userData) {
                throw Error("Couldn't fetch user data!");
            }
        }
        
        return this.#userData;
    }
    
    /**
     * Create UserAPI instance from a jwt token
     * 
     */
    static async fromJWT(token: string, debug=false) {
        const url = SERVER_URL_MAPPINGS.AUTHENTICATION;
        const instance = createAxiosInstance(url, '', token);
        const api = new UserAPI(instance, token, debug);
        
        return api;
    }
    
    // --- User data ---
    /**
     * Get user data
     * 
     */
    async data(): Promise<DataResultType> {
        const endpoint = "/user/data";
        if(this.debug) {
            const fullUrl = `${this.serverUrl}${endpoint}`;
            console.log(`Complete url: ${fullUrl}`);
        }
        
        const res: AxiosResponse = await this.instance.get(endpoint)
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                throw Error("Couldn't fetch user data!");
            });
        
        const result: DataResultType = res.data;
        
        if(!this.#userData) {
            this.#userData = result.user;
        }
        
        return result;
    }
    
    // --- User operations ---
    /**
     * Delete user
     */
    async delete(): Promise<DeleteUserResultType> {
        const endpoint = "/user/delete";
        if(this.debug) {
            const fullUrl = `${this.serverUrl}${endpoint}`;
            console.log(`Complete url: ${fullUrl}`);
        }
        
        if(!this.#userData) {
            // Try to fetch data first
            await this.data();
            
            // This can't be
            if(!this.#userData) {
                throw Error("There's no user data!");
            }
        }
        
        const res: AxiosResponse = await this.instance.post(endpoint, this.#userData)
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                throw Error("Couldn't delete the user");
            });
        
        return res.data;
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
    ): Promise<CreateResultType> {
        // Endpoint
        const endpoint: string = `/user/password/create/${token}`;
        
        // Debugging
        if(this.debug) {
            const fullUrl = `${this.serverUrl}${endpoint}`;
            console.log(`Complete url: ${fullUrl}`);
        }
        
        const res: AxiosResponse = await this.instance.post(endpoint, {
            password,
            confirmPassword
        })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.error(err);
                throw Error("Couldn't create new password!");
            });
        
        const responseData: CreateResultType = res.data;
        
        return responseData;
    }
    
    // --- Conversion ---
    /**
     * Convert to property API
     */
    propertyApi(): PropertyAPI {
        const api = new PropertyAPI(this.token);
        return api;
    }
}

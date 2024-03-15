import { AxiosInstance, AxiosResponse } from "axios";

import FrontendAuthAPI from "../FrontendAuthAPI";
import SERVER_URL_MAPPINGS from "../../../mappings/env/SERVER_URL_MAPPINGS";
import createAxiosInstance from "../../../createAxiosInstance";

// Types
import CreateResultType from "../../../types/server/authentication/auth/password/CreateResultType";
import DeleteResultType from "../../../types/server/authentication/user/DeleteResultType";
import DataResultType from "../../../types/server/authentication/user/DataResultType";
import CompleteUserData from "../../../types/CompleteUserData";

/**
 * User API
 * 
 * To handle protected endpoints
 */
export default class UserAPI {
    serverUrl: string = "";
    debug: boolean = false;
    instance: AxiosInstance;
    #userData: CompleteUserData | undefined;
    
    /**
     * 
     * @param debug 
     */
    constructor(debug=false) {
        this.debug = debug;

        this.instance = createAxiosInstance(SERVER_URL_MAPPINGS.AUTHENTICATION);
    }
    
    // --- Constructors ---
    // Other kind of constructors that I see more suitable than the main
    /**
     * 
     */
    static fromAuthenticatedAPI(authApi: FrontendAuthAPI, debug=false) {
        const api = new UserAPI(debug);
        api.serverUrl = authApi.serverUrl;
        api.instance = authApi.instance;
        
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
        const api = new UserAPI(debug);
        
        // Url
        const url = SERVER_URL_MAPPINGS.AUTHENTICATION;
        api.serverUrl = url;
        
        // Create instance
        api.instance = createAxiosInstance(url, "", token);
        
        // Get data
        await api.data();
        
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
    async delete(): Promise<DeleteResultType> {
        const endpoint = "/user/delete";
        if(this.debug) {
            const fullUrl = `${this.serverUrl}${endpoint}`;
            console.log(`Complete url: ${fullUrl}`);
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
}

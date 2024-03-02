import { AxiosInstance, AxiosResponse } from "axios";

import UserAPI from "./secure/UserAPI";
import UserData from "../../types/UserData";
import createAxiosInstance from "../../createAxiosInstance";
import SERVER_URL_MAPPINGS from "../../mappings/env/SERVER_URL_MAPPINGS";
import BackendServerAccessAPI from "../backdoor/BackendServerAccessAPI";

// Types
import RegisterResultType from "../../types/server/authentication/auth/RegisterResultType";
import LoginResultType from "../../types/server/authentication/auth/LoginResultType";
import LoginGetJwtResultType from "../../types/server/authentication/auth/LoginGetJwtResultType";

/**
 * Auth API
 * 
 * Simplistic abstraction of express authentication endpoints
 */
export default class FrontendAuthAPI {
    loggedIn = false;
    userData: UserData;
    debug: boolean;
    serverUrl: string;
    instance: AxiosInstance;
    
    /**
     * User data
     * 
     * @param {Object} userData User data
     * @param {boolean} [debug=false] Debug mode for this API
     */
    constructor(userData: UserData, debug=false) {
        this.userData = userData;
        this.debug = debug;
        
        // Set server url
        this.serverUrl = SERVER_URL_MAPPINGS.AUTHENTICATION;
        if(this.debug) {
            console.log(`Server url: ${this.debug}`);
        }
        
        this.instance = createAxiosInstance(this.serverUrl);
    }
    
    // --- Miscellaneous ---
    /**
     * Endpoint scope
     * 
     * If the authentication(endpoints) are running at a given scope set this
     */
    setEndpointScope(authScope: string) {
        this.serverUrl = `${this.serverUrl}/${authScope}`;
        
        this.setInstance(this.serverUrl);
    }
    
    /**
     * Create instance
     * 
     * @param {string} serverUrl The server url
     * @param {string} jwtToken JWT Authentication token(optional)
     */
    setInstance(serverUrl: string, jwtToken = '') {
        this.instance = createAxiosInstance(serverUrl, "", jwtToken);
    }
    
    // --- For testing ---
    /**
     * Confirm user email with private key
     */
    async confirmUserEmailWithPrivateKey() {
        // TODO: Available on the same server
        const backdoorServerUrl = SERVER_URL_MAPPINGS.BACKDOOR_SERVER_ACCESS;
        if(!backdoorServerUrl) throw Error("You have to set 'BACKDOOR_SERVER_ACCESS_URL'");
        
        const api = new BackendServerAccessAPI();
        api.setUrl(backdoorServerUrl);
        const key = await api.emailConfirmationKey();
        
        const res: AxiosResponse | undefined = await this.instance.post("/auth/email", { key, ...this.userData })
            .then((res) => res)
            .catch(err => {
                console.error(err);
                
                return undefined;
            });
        
        return res && res.data || undefined;
    }
    
    // --- Operations ---
    /**
     * Register user
     */
    async registerUser(): Promise<RegisterResultType | undefined> {
        const endpoint = "/auth/register";
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
    
    // --- Login ---
    /**
     * Update logged in
     * 
     * Private facilitation function
     * 
     * @param {Object} res Axios response object
     */
    #updateLoggedIn(res: AxiosResponse) {
        this.setInstance(this.serverUrl, res.data.token);
        
        this.loggedIn = true;
        
        return this;
    }
    
    /**
     * Login user
     * 
     * It's not very helpful, because I can't access protected endpoints with the axios instance.
     */
    async loginUser(): Promise<LoginResultType | undefined> {
        const endpoint = "/auth/login";
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
        
        // Update logged in status
        if(res) {
            this.#updateLoggedIn(res);
        }
        
        return res && res.data || undefined;
    }
    
    /**
     * Login get jwt
     * 
     * Use to login and get the jwt token directly
     */
    async loginGetJwt(): Promise<LoginGetJwtResultType | undefined> {
        const endpoint = "/auth/login_get_jwt";
        if(this.debug) {
            const fullUrl = `${this.serverUrl}${endpoint}`;
            console.log(`Complete url: ${fullUrl}`);
        }
        
        const res: AxiosResponse | undefined = await this.instance.post(endpoint, this.userData)
            .then((res) => res)
            .catch((err) => {
                console.log(`Couldn't get JWT token`);
                console.error(err);
                return undefined;
            });
        
        // Update logged in status
        if(res) {
            this.#updateLoggedIn(res);
        }

        return res && res.data || undefined;
    }
    
    // --- Conversions ---
    /**
     * User API
     * 
     * @returns {UserAPI} 
     */
    userApi(): UserAPI {
        const api = UserAPI.fromAuthenticatedAPI(this);
        
        return api;
    }
}

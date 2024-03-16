import { AxiosInstance, AxiosResponse } from "axios";

import UserAPI from "../user/UserAPI";
import UserData from "../../types/UserData";
import createAxiosInstance from "../../createAxiosInstance";
import SERVER_URL_MAPPINGS from "../../mappings/env/SERVER_URL_MAPPINGS";
import BackendServerAccessAPI from "../backdoor/BackendServerAccessAPI";

// Types
import RegisterResultType from "../../types/server/authentication/auth/RegisterResultType";
import LoginResultType from "../../types/server/authentication/auth/LoginResultType";
import LoginGetJwtResultType from "../../types/server/authentication/auth/LoginGetJwtResultType";
import CompleteUserData from "../../types/CompleteUserData";
import RegisterInputType from "../../types/server/authentication/auth/RegisterInputType";
import LoginInputType from "../../types/server/authentication/auth/LoginInputType";
import BackdoorConfirmEmailInputType from "../../types/server/authentication/auth/BackdoorConfirmEmailInputType";
import BackdoorConfirmEmailResultType from "../../types/server/authentication/auth/BackdoorConfirmEmailResultType";

/**
 * Auth API
 * 
 * Simplistic abstraction of express authentication endpoints
 */
export default class FrontendAuthAPI {
    loggedIn = false;
    debug: boolean;
    serverUrl: string;
    instance: AxiosInstance;
    token: string | undefined;
    
    /**
     * User data
     * 
     */
    constructor(debug=false) {
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
    async confirmUserEmailWithPrivateKey(email: string): Promise<BackdoorConfirmEmailResultType> {
        // TODO: Available on the same server
        const backdoorServerUrl = SERVER_URL_MAPPINGS.BACKDOOR_SERVER_ACCESS;
        if(!backdoorServerUrl) {
            throw Error("You have to set 'BACKDOOR_SERVER_ACCESS_URL'")
        };
        
        // Access backend server and steal(jk) the key
        const api = new BackendServerAccessAPI();
        api.setUrl(backdoorServerUrl);
        const key = await api.emailConfirmationKey();
        
        if(!key) {
            throw Error("Couldn't fetch the user key");
        }
        
        // Body
        const body: BackdoorConfirmEmailInputType =  { key, email };
        
        // Send request
        const res: AxiosResponse = await this.instance.post("/auth/email", body)
            .then((res) => res)
            .catch(err => {
                console.error(err);
                throw Error("Couldn't fetch user data!");
            });
        
        return res.data;
    }
    
    // --- Operations ---
    /**
     * Register user
     */
    async registerUser(userData: RegisterInputType): Promise<RegisterResultType> {
        const endpoint = "/auth/register";
        if(this.debug) {
            const fullUrl = `${this.serverUrl}${endpoint}`;
            console.log(`Complete url: ${fullUrl}`);
        }
        
        const res: AxiosResponse = await this.instance.post(endpoint, userData)
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                throw Error("Couldn't register the user");
            });
        
        const registerResult: RegisterResultType = res.data;
        
        if(this.debug) {
            console.log(`User registered`);
            console.log(`Response: `, registerResult);
        }
        
        return registerResult;
    }
    
    // --- Login ---
    /**
     * Update logged in
     * 
     * Private facilitation function
     * 
     * @param {Object} res Axios response object
     */
    #updateLoggedIn(res: LoginResultType | LoginGetJwtResultType) {
        if(!res.token) {
            return;
        }
        
        this.token = res.token;
        
        this.setInstance(this.serverUrl, this.token);
        
        this.loggedIn = true;
        
        return this;
    }
    
    /**
     * Login user
     * 
     * It's not very helpful, because I can't access protected endpoints with the axios instance.
     */
    async loginUser(userCredentials: LoginInputType): Promise<LoginResultType> {
        const endpoint = "/auth/login";
        if(this.debug) {
            const fullUrl = `${this.serverUrl}${endpoint}`;
            console.log(`Complete url: ${fullUrl}`);
        }
        
        const res: AxiosResponse = await this.instance.post(endpoint, userCredentials)
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                throw Error("Couldn't login the user");
            });
        
        const responseData: LoginResultType = res.data;
        
        // Update logged in status
        this.#updateLoggedIn(responseData);
        
        return res.data;
    }
    
    /**
     * Login get jwt
     * 
     * Use to login and get the jwt token directly
     */
    async loginGetJwt(userCredentials: LoginInputType): Promise<LoginGetJwtResultType> {
        const endpoint = "/auth/login_get_jwt";
        if(this.debug) {
            const fullUrl = `${this.serverUrl}${endpoint}`;
            console.log(`Complete url: ${fullUrl}`);
        }
        
        const res: AxiosResponse = await this.instance.post(endpoint, userCredentials)
            .then((res) => res)
            .catch((err) => {
                console.log(`Couldn't get JWT token`);
                console.error(err);
                throw Error("Couldn't get JWT token")
            });
        
        const responseData: LoginGetJwtResultType = res.data;
        
        if(this.debug) {
            console.log(`Response: `, responseData);
        }
        
        // Update logged in status
        this.#updateLoggedIn(responseData);

        return res.data;
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

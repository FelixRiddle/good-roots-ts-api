import axios, { AxiosInstance, AxiosResponse } from "axios";

import FrontendAuthAPI from "../FrontendAuthAPI";
import BackendServerAccessAPI from "../../backdoor/BackendServerAccessAPI";
import UserData from "../../../types/UserData";
import SERVER_URL_MAPPINGS from "../../../mappings/env/SERVER_URL_MAPPINGS";

import SendResetEmailResultType from "../../../types/server/authentication/auth/password/SendResetEmailResultType";

/**
 * Non authenticated reset password API
 */
export default class ResetPasswordAPI {
    userData: UserData;
    instance: AxiosInstance;
    backdoorServerUrl: string;
    
    /**
     * @param {object} userData User data
     */
    constructor(userData: UserData) {
        this.userData = userData;
        
        // Headers
        let headers = {
            "Content-Type": "application/json"
        };
        this.instance = axios.create({
            withCredentials: true,
            baseURL: SERVER_URL_MAPPINGS.AUTHENTICATION,
            timeout: 2000,
            headers,
        });
    }
    
    /**
     * Set backdoor server url
     */
    setBackdoorServerUrl(url) {
        this.backdoorServerUrl = url;
    }
    
    /**
     * Set axios instance
     */
    setAxiosInstance(instance) {
        this.instance = instance;
    }
    
    /**
     * From auth api
     * 
     * @param {AuthAPI} authAPI 
     */
    static fromAuthenticatedAPI(authAPI: FrontendAuthAPI): ResetPasswordAPI {
        const resetAPI = new ResetPasswordAPI(authAPI.userData);
        
        // Set the authenticated instance
        resetAPI.setAxiosInstance(authAPI.instance);
        
        return resetAPI;
    }
    
    /**
     * Start reset password process
     * 
     * By sending reset email
     */
    async sendResetEmail(): Promise<SendResetEmailResultType | undefined> {
        const res = await this.instance.post("/auth/password/send_reset_email", {
            email: this.userData.email,
        })
            .then((res) => res)
            .catch(err => {
                console.error(err);
            });
        
        return res && res.data || undefined;
    }
    
    /**
     * Create new password
     * 
     * Next event after a reset was issued.
     * 
     * We will use backdoor access here, because traversing html and reading emails is too much of a hassle.
     */
    async createWithKey(): Promise<SendResetEmailResultType | undefined> {
        if(!this.backdoorServerUrl) {
            throw Error("Backdoor server url not given");
        }
        
        // Create and set the url
        const backdoorApi = new BackendServerAccessAPI();
        backdoorApi.setUrl(this.backdoorServerUrl);
        
        // Get backdoor key
        const key = await backdoorApi.createPasswordKey();
        
        const res = await this.instance.post("/auth/password/create_with_key", {
            ...this.userData,
            key
        })
            .then((res) => res)
            .catch(err => {
                console.error(err);
            });
        
        return res && res.data || undefined;
    }
}

import axios, { AxiosInstance, AxiosResponse } from "axios";

import { SERVERS_DEFAULT_LOCATION } from "../../../index";

import FrontendAuthAPI from "../FrontendAuthAPI";
import BackendServerAccessAPI from "../../backdoor/BackendServerAccessAPI";

import SendResetEmailResultType from "../../../types/server/authentication/auth/password/SendResetEmailResultType";
import DataResultType from "../../../types/server/authentication/user/DataResultType";
import CompleteUserData from "../../../types/CompleteUserData";

export type ResetPasswordAPIOptions = {
    debug: boolean,
    serverBaseUrl?: string
}

/**
 * Non authenticated reset password API
 */
export default class ResetPasswordAPI {
    debug: boolean;
    userData: CompleteUserData;
    instance: AxiosInstance;
    backdoorServerUrl: string;
    
    /**
     * @param {object} userData User data
     */
    constructor(userData: CompleteUserData, options: ResetPasswordAPIOptions = {
        debug: false,
    }) {
        this.userData = userData;
        
        this.debug = options.debug;
        
        if(!options.serverBaseUrl) {
            this.backdoorServerUrl = SERVERS_DEFAULT_LOCATION['express-authentication'];
        } else {
            this.backdoorServerUrl = options.serverBaseUrl;
        }
        
        // Headers
        let headers = {
            "Content-Type": "application/json"
        };
        this.instance = axios.create({
            withCredentials: true,
            baseURL: this.backdoorServerUrl,
            timeout: 2000,
            headers,
        });
    }
    
    /**
     * Set backdoor server url
     */
    setBackdoorServerUrl(url: string) {
        this.backdoorServerUrl = url;
    }
    
    /**
     * Set axios instance
     */
    setAxiosInstance(instance: AxiosInstance) {
        this.instance = instance;
    }
    
    /**
     * From auth api
     * 
     * @param {AuthAPI} authAPI 
     */
    static async fromAuthenticatedAPI(authAPI: FrontendAuthAPI): Promise<ResetPasswordAPI> {
        const res: DataResultType = await authAPI.userApi().data();
        const userData = res.user;
        if(!userData) {
            throw Error("Couldn't fetch user data");
        }
        
        const resetAPI = new ResetPasswordAPI(userData);
        
        // Set the authenticated instance
        resetAPI.setAxiosInstance(authAPI.instance);
        
        return resetAPI;
    }
    
    /**
     * Start reset password process
     * 
     * By sending reset email
     */
    async sendResetEmail(): Promise<SendResetEmailResultType> {
        const res: AxiosResponse = await this.instance.post("/auth/password/send_reset_email", {
            email: this.userData.email,
        })
            .then((res) => res)
            .catch(err => {
                console.error(err);
                throw Error("Couldn't send reset email");
            });
        
        return res.data;
    }
    
    /**
     * Create new password
     * 
     * Next event after a reset was issued.
     * 
     * We will use backdoor access here, because traversing html and reading emails is too much of a hassle.
     */
    async createWithKey(): Promise<SendResetEmailResultType> {
        if(!this.backdoorServerUrl) {
            throw Error("Backdoor server url not given");
        }
        
        // Create and set the url
        const backdoorApi = new BackendServerAccessAPI();
        backdoorApi.setUrl(this.backdoorServerUrl);
        
        // Get backdoor key
        const key = await backdoorApi.createPasswordKey();
        
        const res: AxiosResponse = await this.instance.post("/auth/password/create_with_key", {
            ...this.userData,
            key
        })
            .then((res) => res)
            .catch(err => {
                console.error(err);
                throw Error("Couldn't create new password with key");
            });
        
        return res.data;
    }
}

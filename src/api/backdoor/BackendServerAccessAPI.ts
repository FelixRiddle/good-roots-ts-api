import { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";

import SERVER_URL_MAPPINGS from "../../mappings/env/SERVER_URL_MAPPINGS";

export default class BackendServerAccessAPI {
    url: string;
    instance: AxiosInstance;
    
    constructor() {
        this.url = SERVER_URL_MAPPINGS.BACKDOOR_SERVER_ACCESS;
        this.setInstance();
    }
    
    /**
     * Set backend url
     * 
     * @param {*} url 
     */
    setUrl(url: string) {
        this.url = url;
        this.setInstance();
        
        return this;
    }
    
    /**
     * Get email confirmation key
     */
    async emailConfirmationKey(): Promise<string | undefined> {
        const url = `${this.url}/auth/email/email_confirmation`;
        
        const res: AxiosResponse | undefined = await this.instance.get(url)
            .then((res: AxiosResponse) => {
                return res;
            })
            .catch((err) => {
                console.error(err);
                
                return undefined;
            });
        
        if(res) {
            return res.data.key;
        } else {
            return undefined;
        }
    }
    
    /**
     * Get create password private key
     */
    async createPasswordKey(): Promise<string | undefined> {
        const url = `${this.url}/auth/password/create`;
        
        const res: AxiosResponse | undefined = await this.instance.get(url)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.error(err);
                
                return undefined;
            });
        
        
        if(res) {
            return res.data.key;
        } else {
            return undefined;
        }
    }
    
    /**
     * Set axios instance
     */
    setInstance() {
        // Create headers
        let headers = {
            "Content-Type": "application/json"
        };
        
        this.instance = axios.create({
            baseURL: this.url,
            timeout: 2000,
            headers,
        });
        
        return this;
    }
};

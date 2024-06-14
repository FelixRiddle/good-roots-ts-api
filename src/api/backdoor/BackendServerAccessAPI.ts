import { AxiosInstance, AxiosResponse } from "axios";

import { SERVERS_DEFAULT_LOCATION } from "../../index";
import createAxiosInstance from "../../createAxiosInstance";

export interface BackendServerAccessAPIOptions {
    debug: boolean,
    serverBaseUrl?: string,
}

/**
 * Backend server access api
 */
export default class BackendServerAccessAPI {
    url: string;
    instance: AxiosInstance;
    
    constructor(options: BackendServerAccessAPIOptions = {
        debug: false,
    }) {
        // Set server url
        if(!options.serverBaseUrl) {
            this.url = SERVERS_DEFAULT_LOCATION['backdoor-server-access'];
        } else {
            this.url = options.serverBaseUrl;
        }
        
        this.instance = createAxiosInstance(this.url, '', '');
    }
    
    /**
     * Set backend url
     * 
     * @param {*} url 
     */
    setUrl(url: string) {
        this.url = url;
        this.instance = createAxiosInstance(url, '', '');
        
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
};

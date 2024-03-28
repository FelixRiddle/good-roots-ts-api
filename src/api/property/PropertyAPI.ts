import { AxiosInstance } from "axios";

import { SERVERS_DEFAULT_LOCATION } from "../../index";
import createAxiosInstance from "../../createAxiosInstance";

export interface PropertyAPIOptions {
    debug: boolean,
    serverBaseUrl?: string,
    token: string,
}

/**
 * Public property api
 * 
 * Only for properties that have been published
 */
export default class PropertyAPI {
    debug = false;
    instance: AxiosInstance;
    url: string;
    
    /**
     * Property api
     * 
     */
    constructor(options: PropertyAPIOptions = {
        debug: false,
        token: ''
    }) {
        // Set server url
        if(!options.serverBaseUrl) {
            this.url = SERVERS_DEFAULT_LOCATION['express-real-estate'];
        } else {
            this.url = options.serverBaseUrl;
        }
        
        this.instance = createAxiosInstance(this.url, "property", options.token);
    }
    
    /**
     * Fetch all
     */
    fetchAll() {
        if(this.debug) {
            console.log(`Fetching properties at /property/operation/get_all`);
            console.log(`That is for the public properties`);
        }
        
        const res = this.instance.get("/operation/get_all")
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.error(err);
                throw Error("Couldn't fetch the properties");
            });
        
        return res;
    }
}

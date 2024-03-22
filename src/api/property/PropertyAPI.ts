import { AxiosInstance } from "axios";

import { LocationSelection } from "felixriddle.configuration-mappings";

import createAxiosInstance from "../../createAxiosInstance";
// import SERVER_URL_MAPPINGS from "../../mappings/env/SERVER_URL_MAPPINGS";

/**
 * Public property api
 * 
 * Only for properties that have been published
 */
export default class PropertyAPI {
    debug = false;
    
    instance: AxiosInstance;
    
    /**
     * Property api
     * 
     */
    constructor(token: string = '') {
        const url = LocationSelection.realEstate();
        
        this.instance = createAxiosInstance(url, "property", token);
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

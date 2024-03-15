import { AxiosInstance, AxiosResponse } from "axios";
import createAxiosInstance from "../../../createAxiosInstance";
import SERVER_URL_MAPPINGS from "../../../mappings/env/SERVER_URL_MAPPINGS";
import MyPropertiesPageResultType from "../../../types/server/property/MyPropertiesPageResultType";

/**
 * Property API
 */
export default class PropertyAPI {
    debug = false;
    instance: AxiosInstance
    
    constructor(token: string, debug=false) {
        this.debug = debug;
        
        // Url
        const url = SERVER_URL_MAPPINGS.REAL_ESTATE;
        
        // Create instance
        this.instance = createAxiosInstance(url, "", token);
    }
    
    // --- Actions ---
    /**
     * Create a property
     */
    create() {
        
    }
    
    // --- Fetch ---
    /**
     * User properties
     * 
     * @param pageNumber 
     * @returns 
     */
    async userProperties(pageNumber: number = 1): Promise<MyPropertiesPageResultType> {
        const endpoint = `/user/property/admin?page=${pageNumber}`;
        
        const res: AxiosResponse = await this.instance.get(endpoint)
            .then((res) => res)
            .catch((err) => {
                throw Error(err);
            });
        
        return res.data;
    }
}

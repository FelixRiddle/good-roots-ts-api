import { AxiosInstance } from "axios";
import createAxiosInstance from "../../../createAxiosInstance";
import SERVER_URL_MAPPINGS from "../../../mappings/env/SERVER_URL_MAPPINGS";

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
    
    /**
     * Create a property
     */
    create() {
        
    }
}

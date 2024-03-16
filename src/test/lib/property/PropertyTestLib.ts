import PropertyAPI from "../../../api/user/property/PropertyAPI";

/**
 * Utility class for property management
 */
export default class PropertyTestLib {
    api: PropertyAPI;
    
    constructor(api: PropertyAPI) {
        this.api = api;
    }
    
    /**
     * Check if the user has zero properties
     */
    async zeroProperties(): Promise<boolean> {
        // Now try to fetch them
        const properties = await this.api.getAll();
        
        const zeroProperties = properties.properties.length == 0;
        return zeroProperties;
    }
}

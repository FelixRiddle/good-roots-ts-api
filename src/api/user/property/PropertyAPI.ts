import { AxiosInstance, AxiosResponse } from "axios";

import ConfMap from "felixriddle.configuration-mappings";

import createAxiosInstance from "../../../createAxiosInstance";
// import SERVER_URL_MAPPINGS from "../../../mappings/env/SERVER_URL_MAPPINGS";
import MyPropertiesPageResultType from "../../../types/server/user/property/MyPropertiesPageResultType";
import CreateUserPropertyInputType from "../../../types/server/user/property/CreateUserPropertyInputType";
import CreateUserPropertyResultType from "../../../types/server/user/property/CreateUserPropertyResultType";
import DeleteUserPropertyResultType from "../../../types/server/user/property/DeleteUserPropertyResultType";

/**
 * Property API
 */
export default class PropertyAPI {
    debug = false;
    instance: AxiosInstance
    
    constructor(token: string, debug=false) {
        this.debug = debug;
        
        const url = ConfMap.LocationSelection.realEstate();
        
        // // Url
        // const url = SERVER_URL_MAPPINGS.REAL_ESTATE;
        
        // Create instance
        this.instance = createAxiosInstance(url, "", token);
    }
    
    // --- Actions ---
    /**
     * Create a property
     */
    async create(propertyData: CreateUserPropertyInputType): Promise<CreateUserPropertyResultType> {
        const endpoint = `/user/property/create`;
        const res: AxiosResponse = await this.instance.post(endpoint, { property: propertyData })
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                throw Error("Couldn't create property");
            })
        
        return res.data;
    }
    
    /**
     * Get all
     */
    async getAll() {
        const res = await this.instance.get("/user/property/operation/get_all")
            .then((res) => res.data)
            .catch((err) => {
                console.error(err);
                throw Error("Couldn't fetch user properties");
            });
        
        return res;
    }
    
    /**
     * Delete user property
     * 
     * @param id 
     */
    async deleteProperty(id: number): Promise<DeleteUserPropertyResultType> {
        const res = await this.instance.post(`/user/property/delete/${id}`)
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                throw Error("Coudln't delete user property");
            });
        
        return res.data;
    }
    
    /**
     * Deletes all user(the one logged in) properties
     * 
     */
    async userDeleteAll(): Promise<Array<DeleteUserPropertyResultType>> {
        const properties = await this.getAll();
        let results: Array<DeleteUserPropertyResultType> = [];
        
        if(properties && properties.properties) {
            for(const property of properties.properties) {
                const res = await this.deleteProperty(property.id);
                
                results.push(res);
            }
        }
        
        return results;
    }
    
    /**
     * Edit property by id
     * 
     * @param {number} id Property id
     * @param {object} property Property information to update
     */
    async editPropertyById(id: number, property: CreateUserPropertyInputType) {
        const res = await this.instance.post(`/user/property/edit/${id}`, {
            property
        })
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                throw Error("Couldn't edit the property");
            });
        
        return res.data;
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

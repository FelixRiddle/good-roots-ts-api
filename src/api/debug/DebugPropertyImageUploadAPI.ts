import axios from "axios";

import DebugPropertyImageUploadModel from "../../debug/DebugPropertyImageUploadModel.js";

/**
 * 
 */
export default class DebugPropertyImageUploadAPI {
    
    constructor(serverUrl: string, jwtToken = '') {
        this.setInstance(serverUrl, jwtToken);
    }
    
    /**
     * Create instance
     * 
     * @param {string} serverUrl The server url
     * @param {string} jwtToken JWT Authentication token(optional)
     */
    setInstance(serverUrl: string, jwtToken = '') {
        
        // Create headers
        let headers = {
            "Content-Type": "application/json"
        };
        if(jwtToken) {
            // Add jwt token
            headers["Cookie"] = `_token=${jwtToken}`;
        }
        
        // Location is not defined in nodejs
        const isUndefined = typeof(location) === 'undefined';
        if(!isUndefined) {
            this.instance = axios.create({
                withCredentials: true,
                baseURL: `${location.origin}`,
                timeout: 2000,
                headers,
            });
        } else if(!serverUrl) {
            throw Error("Server url is required when the AuthenticationAPI is used in NodeJS");
        } else {
            this.instance = axios.create({
                withCredentials: true,
                baseURL: `${serverUrl}`,
                timeout: 2000,
                headers,
            });
        }
    }
    
    // --- Information ---
    setActionStage(actionStage) {
        this.actionStage = actionStage;
    }
    
    setCourseUUID(uuid){
        this.courseUuid = uuid;
    }
    
    setImageNames(images) {
        this.imageNames = images;
    }
    
    // --- Actual functionality ---
    /**
     * Create message
     * 
     * @param {*} title 
     * @param {*} message 
     * @param {*} status 
     * @param {*} imageName 
     * @returns 
     */
    async createMessage(title, message, status) {
        if(!this.courseUuid) {
            throw Error("Course uuid can't be empty!");
        }
        
        if(!this.actionStage) {
            throw Error("Action stage can't be empty!");
        }
        
        // Create message
        const imageInfo = new DebugPropertyImageUploadModel(
            title,
            message,
            status,
            this.imageNames,
            this.courseUuid,
            this.actionStage,
        );
        
        const res = await this.instance.post("/debug/model/debug_property_image_upload/create", {
            imageInfo,
        })
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                return;
            });
        
        return res.body;
    }
}

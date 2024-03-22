import { AxiosInstance } from "axios";

import DebugPropertyImageUploadType from "../../types/server/debug/DebugPropertyImageUpload";
import SERVER_URL_MAPPINGS from "../../mappings/env/SERVER_URL_MAPPINGS";
import createAxiosInstance from "../../createAxiosInstance";

// 1) Frontend validation
// 2) Folder creation and validation
// 3) Backend validation
// 4) Endpoint finishing touches

/**
 * 
 */
export default class DebugPropertyImageUploadAPI {
    instance: AxiosInstance;
    actionStage: number;
    courseUuid: string;
    imageNames: Array<string>;
    
    constructor(actionStage: number, courseUuid: string, imageNames: Array<string>, jwtToken = '') {
        this.actionStage = actionStage;
        this.courseUuid = courseUuid;
        this.imageNames = imageNames;
        
        this.instance = createAxiosInstance(SERVER_URL_MAPPINGS.REAL_ESTATE, '', jwtToken);
    }
    
    // --- Information ---
    setActionStage(actionStage: number) {
        this.actionStage = actionStage;
    }
    
    setCourseUUID(uuid: string){
        this.courseUuid = uuid;
    }
    
    setImageNames(images: Array<string>) {
        this.imageNames = images;
    }
    
    // --- Actual functionality ---
    /**
     * Create message
     * 
     */
    async createMessage(title: string, message: string, status: number) {
        if(!this.courseUuid) {
            throw Error("Course uuid can't be empty!");
        }
        
        if(!this.actionStage) {
            throw Error("Action stage can't be empty!");
        }
        
        // Create message
        const imageInfo: DebugPropertyImageUploadType = {
            title,
            message,
            status,
            imageNames: this.imageNames,
            actionCourseUuid: this.courseUuid,
            actionStage: this.actionStage,
        };
        
        const res = await this.instance.post("/debug/model/debug_property_image_upload/create", {
            imageInfo,
        })
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                return;
            });
        
        if(res && res.data) {
            return res.data;
        } else {
            return undefined;
        }
    }
}

import CreateUserPropertyInputType from "../../../../types/server/user/property/CreateUserPropertyInputType";
import TestLib from "../../../TestLib";
import { DEFAULT_PROPERTY } from "../../../lib/property";
import { testMessage } from "../../../testMessage";

/**
 * Create property
 */
export async function propertyApiCreateTest() {
    let result = false;
    try {
        const testLib = await TestLib.create();
        
        // Get property api
        const api = testLib.propertyApi();
        
        // Create some property
        const createResult = await api.create(DEFAULT_PROPERTY);
        
        const deleteResults = await api.userDeleteAll();
        
        await testLib.deleteUser();
        
        const propertyCreated = createResult.propertyCreated;
        result = propertyCreated;
    } catch(err) {
        // Do nothing, we just don't want to stop code from running
        console.error(err);
    }
    
    testMessage(result, "Create property");
}

/**
 * Try to create property with bad title
 */
export async function propertyApiBadTitle() {
    let result = false;
    try {
        const testLib = await TestLib.create();
        
        // Get property api
        const api = testLib.propertyApi();
        
        let propertyData: CreateUserPropertyInputType = JSON.parse(JSON.stringify(DEFAULT_PROPERTY));
        propertyData.title = "a";
        
        // Create some property
        const createResult = await api.create(propertyData);
        const deleteResults = await api.userDeleteAll();
        
        await testLib.deleteUser();
        
        // We will test that it's false
        const propertyCreated = !createResult.propertyCreated;
        result = propertyCreated;
    } catch(err) {
        // Do nothing, we just don't want to stop code from running
    }
    
    testMessage(result, "Can't create property with bad title");
}

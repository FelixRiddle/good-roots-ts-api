import CreateUserPropertyInputType from "../../../types/server/user/property/CreateUserPropertyInputType";
import TestLib from "../../TestLib";
import { DEFAULT_PROPERTY } from "../../lib/property";
import { testMessage } from "../../testMessage";

/**
 * Create property
 */
export async function propertyApiCreateTest() {
    const testLib = await TestLib.create();
    
    // Get property api
    const api = testLib.propertyApi();
    
    // Create some property
    const createResult = await api.create(DEFAULT_PROPERTY);
    const deleteResults = await api.userDeleteAll();
    
    testLib.deleteUser();
    
    const propertyCreated = createResult.propertyCreated;
    testMessage(propertyCreated, "Create property");
}

/**
 * Try to create property with bad title
 */
export async function propertyApiBadTitle() {
    const testLib = await TestLib.create();
    
    // Get property api
    const api = testLib.propertyApi();
    
    let propertyData: CreateUserPropertyInputType = DEFAULT_PROPERTY;
    propertyData.title = "a";
    
    // Create some property
    const createResult = await api.create(propertyData);
    const deleteResults = await api.userDeleteAll();
    
    testLib.deleteUser();
    
    // We will test that it's false
    const propertyCreated = !createResult.propertyCreated;
    testMessage(propertyCreated, "Can't create property with bad title");
}

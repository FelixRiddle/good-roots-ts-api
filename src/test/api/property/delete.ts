import TestLib from "../../TestLib";
import { DEFAULT_PROPERTY } from "../../lib/property";
import PropertyTestLib from "../../lib/property/PropertyTestLib";
import { testMessage } from "../../testMessage";

/**
 * Delete property test
 */
export async function propertyApiDeleteTest() {
    const testLib = await TestLib.create();
    
    // Get property api
    const api = testLib.propertyApi();
    
    // Create some property
    const createResult = await api.create(DEFAULT_PROPERTY);
    const deleteRes = await api.userDeleteAll();
    
    const propertyTestLib = new PropertyTestLib(api);
    const zeroProperties = await propertyTestLib.zeroProperties();
    
    await testLib.deleteUser();
    
    const propertyCreated = createResult.propertyCreated;
    testMessage(propertyCreated && zeroProperties, "Property deleted");
}

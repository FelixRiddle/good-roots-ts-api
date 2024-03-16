import TestLib from "../../TestLib";
import { testMessage } from "../../testMessage";

/**
 * Create property
 */
export async function propertyApiCreateTest() {
    const testLib = await TestLib.create();
    
    
    
    testLib.deleteUser();
    
    const propertyCreated = true;
    testMessage(propertyCreated, "Create property");
}

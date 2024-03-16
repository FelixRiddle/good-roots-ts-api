import CreateUserPropertyInputType from "../../../types/server/user/property/CreateUserPropertyInputType";
import TestLib from "../../TestLib";
import { testMessage } from "../../testMessage";

/**
 * Create property
 */
export async function propertyApiCreateTest() {
    const testLib = await TestLib.create();
    
    // Get property api
    const api = testLib.propertyApi();
    
    // Create some property
    const property: CreateUserPropertyInputType = {
        title: "Luxury house(Good roots ts api)",
        description: "This is a luxury house",
        rooms: 3,
        parking: 2,
        bathrooms: 3,
        street: 'Norris Road 1223',
        latitude: 35.0831751,
        longitude: -90.022207,
        priceId: 5,
        categoryId: 4,
    };
    const createResult = await api.create(property);
    const deleteResults = await api.userDeleteAll();
    
    // console.log(`Create property result: `, createResult);
    // console.log(`Delete results: `, deleteResults);
    
    testLib.deleteUser();
    
    const propertyCreated = createResult.propertyCreated;
    testMessage(propertyCreated, "Create property");
}

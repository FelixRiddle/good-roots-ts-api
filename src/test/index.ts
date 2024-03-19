import runAllApiTests from "./api";

import MapConfig from "felixriddle.configuration-mappings";

/**
 * Run all tests
 */
export default async function runAllTests() {
    
    
    await runAllApiTests();
}

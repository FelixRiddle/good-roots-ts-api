import runAllPublicPropertyTests from "./property";
import runAllAuthTests from "./auth";
import runAllPropertyTests from "./user/property";

/**
 * Api tests
 */
export default async function runAllApiTests() {
    await runAllPublicPropertyTests();
    
    await runAllAuthTests();
    await runAllPropertyTests();
}

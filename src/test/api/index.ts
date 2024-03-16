import runAllAuthTests from "./auth";
import runAllPropertyTests from "./property";

/**
 * Api tests
 */
export default async function runAllApiTests() {
    await runAllAuthTests();
    await runAllPropertyTests();
}

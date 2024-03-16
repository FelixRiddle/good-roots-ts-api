import runAllAuthTests from "./auth";

/**
 * Api tests
 */
export default async function runAllApiTests() {
    await runAllAuthTests();
}

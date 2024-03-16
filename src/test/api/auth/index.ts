import { authApiDeleteTest, authApiFetchDataTest } from "./authApiTest";

/**
 * Auth tests
 */
export default async function runAllAuthTests() {
    await authApiDeleteTest();
    await authApiFetchDataTest();
}

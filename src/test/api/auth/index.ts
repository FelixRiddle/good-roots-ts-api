import colors from "../../../colors";
import { authApiDeleteTest, authApiFetchDataTest } from "./authApiTest";

/**
 * Auth tests
 */
export default async function runAllAuthTests() {
    console.log(colors.fg.magenta, 'Auth tests', colors.fg.white);
    
    await authApiDeleteTest();
    await authApiFetchDataTest();
}

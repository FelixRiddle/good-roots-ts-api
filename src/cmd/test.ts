import { authApiDeleteTest, authApiFetchDataTest } from "../test/api/auth/authApiTest";

/**
 * Execute test
 */
export default async function executeTests(args: any) {
    if(args.test) {
        await authApiDeleteTest();
        await authApiFetchDataTest();
    }
}

import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import ExpressAuthentication from "../../../api/auth/ExpressAuthentication";
import RegisterInputType from "../../../types/server/authentication/auth/RegisterInputType";
import LoginInputType from "../../../types/server/authentication/auth/LoginInputType";
import { testMessage } from "../../testMessage";

/**
 * Auth api test 1
 * 
 */
export async function authApiDeleteTest() {
    let result = false;
    try {
        // Setup dotenv
        dotenv.config({
            path: ".env"
        });
        
        // Create user data
        const userData: RegisterInputType = {
            name: "Alistar",
            email: `${uuidv4()}@email.com`,
            password: "asd12345",
            confirmPassword: "asd12345"
        };
        const loginInput: LoginInputType = {
            email: userData.email,
            password: userData.password,
        };
        
        // Create general manager
        const expressAuth = new ExpressAuthentication();
        
        // Auth api
        const api = expressAuth.authApi();
        await api.registerUser(userData);
        await api.confirmUserEmailWithPrivateKey(loginInput.email);
        await api.loginGetJwt(loginInput);

        // User api
        const userApi = api.userApi();
        const deleteRes = await userApi.delete();
        
        const userDeleted = deleteRes && deleteRes.userDeleted;
        result = userDeleted;
    } catch(err) {
        // Do nothing, we just don't want to stop code from running
    }
    testMessage(result, `Auth api delete user test`);
}

/**
 * Auth api test get data
 */
export async function authApiFetchDataTest() {
    let result = false;
    try {
        // Setup dotenv
        dotenv.config({
            path: ".env"
        });
        
        // Create user data
        const userData: RegisterInputType = {
            name: "Alistar",
            email: `${uuidv4()}@email.com`,
            password: "asd12345",
            confirmPassword: "asd12345"
        };
        const loginInput: LoginInputType = {
            email: userData.email,
            password: userData.password,
        };
        
        // Create general manager
        const expressAuth = new ExpressAuthentication();
        
        // Auth api
        const api = expressAuth.authApi();
        // api.debug = true;
        
        await api.registerUser(userData);
        await api.confirmUserEmailWithPrivateKey(loginInput.email);
        const loginRes = await api.loginGetJwt(loginInput);

        // User api
        const userApi = api.userApi();
        
        // Fetch user data
        const userDataFetch = await userApi.data();
        await userApi.delete();
        
        if(userDataFetch.user) {
            if(userDataFetch.user.email) {
                result = true;
            }
        }
    } catch(err) {
        // Do nothing, we just don't want to stop code from running
    }
    testMessage(result, `Auth API Fetch data test`);
}

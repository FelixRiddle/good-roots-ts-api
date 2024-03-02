// const chalk = import("chalk");
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import ExpressAuthentication from "../../../api/auth/ExpressAuthentication";
import UserData from "../../../types/UserData";
import colors from "../../../colors";

/**
 * Auth api test 1
 * 
 */
export async function authApiDeleteTest() {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    // Create user data
    const userData: UserData = {
        name: "Alistar",
        email: `${uuidv4()}@email.com`,
        password: "asd12345",
        confirmPassword: "asd12345"
    };
    
    // Create general manager
    const expressAuth = new ExpressAuthentication();
    
    // Auth api
    const api = expressAuth.authApi(userData);
    await api.registerUser();
    await api.confirmUserEmailWithPrivateKey();
    await api.loginGetJwt();

    // User api
    const userApi = api.userApi();
    const deleteRes = await userApi.delete();
    
    const userDeleted = deleteRes && deleteRes.userDeleted;
    if(userDeleted) {
        console.log(`Auth api delete user test... `, colors.fg.green, 'Ok', colors.fg.white);
    } else {
        // console.log(`Auth api delete user test... `, colors.fg.crimson, 'Error', colors.fg.white);
        console.log(`Auth api delete user test... `, colors.fg.red, 'Error', colors.fg.white);
    }
}

/**
 * Auth api test get data
 */
export async function authApiFetchDataTest() {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    // Create user data
    const userData: UserData = {
        name: "Alistar",
        email: `${uuidv4()}@email.com`,
        password: "asd12345",
        confirmPassword: "asd12345"
    };
    
    // Create general manager
    const expressAuth = new ExpressAuthentication();
    
    // Auth api
    const api = expressAuth.authApi(userData);
    await api.registerUser();
    await api.confirmUserEmailWithPrivateKey();
    await api.loginGetJwt();

    // User api
    const userApi = api.userApi();
    await userApi.delete();
    
    // Fetch user data
    const userDataFetch = await userApi.data();
    await userApi.delete();
    console.log(`User data fetch: `, userDataFetch);

    const userDataOk = userDataFetch && userDataFetch.user && userDataFetch.user.email;
    if(userDataOk) {
        console.log(`Auth API Fetch data test... `, colors.fg.green, 'Ok', colors.fg.white);
    } else {
        console.log(`Auth API Fetch data test... `, colors.fg.red, 'Error', colors.fg.white);
    }
}

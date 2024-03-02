// const dotenv = require("dotenv");
// const { v4: uuidv4 } = require("uuid");

// const AuthAPI = require("../../../api/auth/AuthAPI");
// const { envServerUrl } = require("../../../controllers/env/env");
// const serverUrl = require("../../../public/web/serverUrl");
// const UserAPI = require("../../../api/secure/UserAPI");
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import FrontendAuthAPI from "../FrontendAuthAPI";
import UserAPI from "../secure/UserAPI";

test("Fetch user data", async () => {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    // Create user data
    const email = `alistar_${uuidv4()}@email.com`;
    const userData = {
        name: "Alistar",
        email: email,
        password: "asd12345",
        confirmPassword: "asd12345"
    };
    
    // Get server url
    const ENV_SERVER_URL = envServerUrl();
    const url = serverUrl(ENV_SERVER_URL);
    
    // Auth api
    const api = new AuthAPI(userData, url);
    
    // Result
    await api.registerUser();
    
    // Confirm user email
    await api.confirmUserEmailWithPrivateKey();
    
    // Login user to be able to delete it
    await api.loginGetJwt();
    
    const userApi = UserAPI.fromAuthenticatedAPI(api);
    
    // Fetch user data
    const userDataFetch = await userApi.data();
    console.log(`User data: `, userData);
    
    await userApi.delete();
    
    // Check that emails match
    expect(userDataFetch.email).toBe(email);
});

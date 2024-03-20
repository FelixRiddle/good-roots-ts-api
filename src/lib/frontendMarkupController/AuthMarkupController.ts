// Login
import FrontendAuthAPI from "../../api/auth/FrontendAuthAPI";

// Server urls
// For the frontend you should overwrite them for subdomains
// e.g: http://localhost:38001 (Authentication) -> auth.perseverancia.com
// http://localhost:38003 (Real estate) -> real_estate.perseverancia.com
// Because these are backend subdomain it's not really important what name they have
// just that they point to the exact location.
import SERVER_URL_MAPPINGS from "../../mappings/env/SERVER_URL_MAPPINGS";
import LoginResultType from "../../types/server/authentication/auth/LoginResultType";
import RegisterResultType from "../../types/server/authentication/auth/RegisterResultType";
import LoginInputType from "../../types/server/authentication/auth/LoginInputType";
import RegisterInputType from "../../types/server/authentication/auth/RegisterInputType";
import DeleteUserResultType from "../../types/server/user/DeleteUserResultType";
import FieldType from "../../types/input/FieldType";

const AUTH_ACTION_LOGIN = 1;
const AUTH_ACTION_REGISTER = 2;
const AUTH_ACTION_LOGOUT = 3;
const AUTH_ACTION_DELETE = 4;

export type ResponseResults = LoginResultType | RegisterResultType | DeleteUserResultType;

/**
 * Auth markup controller
 * 
 * To remove boilerplate and go straight to the point
 * 
 * For authentication my standards are:
 * * Submit button id is: 'authFormSubmit'
 * 
 * Formulary inputs:
 * * Name field id: 'name'
 * * Email field id is: 'email'
 * * Password field id is: 'password'
 * * Confirm password field id is: 'confirmPassword'
 * 
 * The id is the same name of the field in the object data
 */
export default class AuthMarkupController {
    formFieldsId: Array<FieldType> = [];
    formAction: number = 0;
    authAction: number = 0;
    responseResults: Array<ResponseResults> = [];
    redirectAfterAction: boolean = true;
    
    constructor() {
    }
    
    /**
     * Append form field id
     * 
     */
    appendFormFieldId(id: FieldType) {
        this.formFieldsId.push(id);
        
        return this;
    }
    
    /**
     * Get form data
     * 
     * This is so tryhard
     * 
     * It doesn't work with typescript
     * 
     * @returns {Object}
     */
    getFormData(): RegisterInputType {
        const resultObject: RegisterInputType = {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
        };
        
        for(const fieldId of this.formFieldsId) {
            
            // Get input field
            // For typescript to work we have to cast it to HTMLInputElement
            const inputField = <HTMLInputElement>document.getElementById(fieldId);
            if(!inputField) {
                throw Error("Given input couldn't be found!");
            }
            
            // Set field value to the object with its id as key
            const inputValue: string = inputField.value;
            resultObject[fieldId] = inputValue;
        }
        
        return resultObject;
    }
    
    /**
     * Execute auth action
     * 
     * @returns {Object} Axios response object
     */
    async executeAuthAction(): Promise<AuthMarkupController> {
        // TODO: Frontend validation
        const userData: RegisterInputType = this.getFormData();
        
        const api = new FrontendAuthAPI(false);
        switch(this.authAction) {
            case AUTH_ACTION_LOGIN: {
                if(!userData.email || !userData.password) {
                    throw Error("Either password or email is undefined");
                }
                
                // Log in
                const loginInput: LoginInputType = {
                    email: userData.email,
                    password: userData.password,
                };
                const loginResult = await api.loginUser(loginInput);
                
                this.responseResults.push(loginResult);
                break;
            }
            case AUTH_ACTION_REGISTER: {
                if(!userData.email || !userData.password || !userData.name || !userData.confirmPassword) {
                    throw Error("All fields are required");
                }
                
                // Register
                const registerInput: RegisterInputType = {
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    confirmPassword: userData.confirmPassword,
                };
                const registerResult = await api.registerUser(registerInput);
                
                this.responseResults.push(registerResult);
                break;
            }
            case AUTH_ACTION_LOGOUT: {
                // const registerResponse = await api.registerUser();
                // response = registerResponse;
                break;
            }
            case AUTH_ACTION_DELETE: {
                if(!userData.email || !userData.password) {
                    throw Error("Either password or email is undefined");
                }
                
                // Log in
                const loginInput: LoginInputType = {
                    email: userData.email,
                    password: userData.password,
                };
                await api.loginUser(loginInput);
                const userApi = api.userApi();
                const deleteResult = await userApi.delete();
                
                this.responseResults.push(deleteResult);
                break;
            }
            default: {
                break;
            }
        };
        
        return this;
    }
    
    /**
     * Bind on submit click
     * 
     * On submit click perform actions to authenticate
     * 
     * @returns 
     */
    async bindOnSubmitClick() {
        console.log(`Binding click event`);
        
        // Get submit input element
        const submitId = "authFormSubmit";
        const submitInput = document.getElementById(submitId);
        if(!submitInput) {
            console.log(`Couldn't find submit input!`);
            return;
        }
        console.log(`Submit input found`);
        
        // On submit click
        const thisObj = this;
        submitInput.addEventListener("click", async (e) => {
            e.preventDefault();
            
            // Perform the selected auth action
            await thisObj.executeAuthAction();
            
            // Redirect if enabled
            if(this.redirectAfterAction) {
                // For every action the user is redirected to home
                // For now is okay, but later on we want context on where the user was before authenticating
                const homeUrl = `${SERVER_URL_MAPPINGS.GOOD_ROOTS}/home`;
                console.log(`Home url: ${homeUrl}`);
                
                window.location.href = homeUrl;
            }
        });
        
        return this;
    }
    
    // --- Set actions ---
    /**
     * Set the auth action to login
     */
    setActionLogin() {
        this.authAction = AUTH_ACTION_LOGIN;
        
        return this;
    }
    
    setActionRegister() {
        this.authAction = AUTH_ACTION_REGISTER;
        
        return this;
    }
    
    setActionLogout() {
        this.authAction = AUTH_ACTION_LOGOUT;
        
        return this;
    }
    
    /**
     * Delete requires authentication
     * 
     * So this should be performed with a class specifically for '/user' routes manipulation
     * [Possibility Allowance]
     */
    setActionDelete() {
        this.authAction = AUTH_ACTION_DELETE;
        
        return this;
    }
    
    // --- Configuration ---
    /**
     * Enable or disable redirection
     */
    toggleRedirection() {
        this.redirectAfterAction = !this.redirectAfterAction;
    }
    
    // --- Presets ---
    /**
     * Login preset
     * 
     * Assumes you follow my standard form
     */
    async loginPreset() {
        this.setActionLogin()
            .appendFormFieldId("email")
            .appendFormFieldId("password");
        
        await this.bindOnSubmitClick();
    }
    
    /**
     * Register preset
     */
    async registerPreset() {
        this.setActionRegister()
            .appendFormFieldId("name")
            .appendFormFieldId("email")
            .appendFormFieldId("password")
            .appendFormFieldId("confirmPassword");
        
        await this.bindOnSubmitClick();
    }
}

// Login
import FrontendAuthAPI from "../../api/auth/FrontendAuthAPI";

// Server urls
// For the frontend you should overwrite them for subdomains
// e.g: http://localhost:38001 (Authentication) -> auth.perseverancia.com
// http://localhost:38003 (Real estate) -> real_estate.perseverancia.com
// Because these are backend subdomain it's not really important what name they have
// just that they point to the exact location.
import SERVER_URL_MAPPINGS from "../../mappings/env/SERVER_URL_MAPPINGS";
import UserAPI from "../../api/auth/secure/UserAPI";
import UserData from "../../types/UserData";

const AUTH_ACTION_LOGIN = 1;
const AUTH_ACTION_REGISTER = 2;
const AUTH_ACTION_LOGOUT = 3;
const AUTH_ACTION_DELETE = 4;

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
    formFieldsId: Array<string> = [];
    formAction = 0;
    authAction: number
    
    constructor() { }
    
    /**
     * Append form field id
     * 
     * @param {string} id 
     * @returns {Object}
     */
    appendFormFieldId(id: string) {
        this.formFieldsId.push(id);
        
        return this;
    }
    
    /**
     * Get form data
     * 
     * This is so tryhard
     * 
     * @returns {Object}
     */
    getFormData(): UserData {
        const resultObject: UserData = {
            email: "",
            password: "",
        };
        
        for(const fieldId of this.formFieldsId) {
            // Get input field
            // For typescript to work we have to cast it to HTMLInputElement
            const inputField = <HTMLInputElement>document.getElementById(fieldId);
            if(!inputField) {
                throw Error("Given input couldn't be found!");
            }
            
            // Set field value to the object with its id as key
            resultObject[fieldId] = inputField.value;
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
        const userData: UserData = this.getFormData();
        
        const api = new FrontendAuthAPI(userData);
        switch(this.authAction) {
            case AUTH_ACTION_LOGIN: {
                await api.loginUser();
                break;
            }
            case AUTH_ACTION_REGISTER: {
                await api.registerUser();
                break;
            }
            case AUTH_ACTION_LOGOUT: {
                // const registerResponse = await api.registerUser();
                // response = registerResponse;
                break;
            }
            case AUTH_ACTION_DELETE: {
                const api = new UserAPI();
                await api.delete();
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
        // Get submit input element
        const submitId = "authFormSubmit";
        const submitInput = document.getElementById(submitId);
        if(!submitInput) {
            console.log(`Couldn't find submit input!`);
            return;
        }
        
        console.log(`Bind ok!`);
        
        // On submit click
        const thisObj = this;
        submitInput.addEventListener("click", async (e) => {
            e.preventDefault();
            
            // Perform the selected auth action
            await thisObj.executeAuthAction();
            
            // For every action the user is redirected to home
            // For now is okay, but later on we want context on where the user was before authenticating
            window.location.href = `${SERVER_URL_MAPPINGS.AUTHENTICATION}/home`;
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

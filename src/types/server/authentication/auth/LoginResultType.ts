import Status from "../../../Status";

/**
 * 
 */
export default interface LoginResultType {
    userLoggedIn: boolean,
    messages: Array<Status>,
    token: string,
}

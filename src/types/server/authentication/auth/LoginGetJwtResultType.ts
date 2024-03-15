import Status from "../../../Status";

/**
 * Login get jwt result type
 */
export default interface LoginGetJwtResultType {
    token?: string,
    loggedIn: boolean,
    messages: Array<Status>
}

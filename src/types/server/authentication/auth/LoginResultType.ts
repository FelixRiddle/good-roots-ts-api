import Status from "../../../Status";
import UserPublicData from "../../../user/UserPublicData";

/**
 * Login result type
 */
export default interface LoginResultType {
    user: UserPublicData;
    userLoggedIn: boolean,
    messages: Array<Status>,
    token?: string,
}

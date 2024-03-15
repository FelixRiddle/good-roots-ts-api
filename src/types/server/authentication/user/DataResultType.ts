import Status from "../../../Status";
import CompleteUserData from "../../../CompleteUserData";

/**
 * 
 */
export default interface DataResultType {
    user: CompleteUserData | undefined,
    messages: Array<Status>,
}

import UserData from "../../../UserData";
import Status from "../../../Status";

/**
 * 
 */
export default interface DataResultType {
    user: UserData | undefined,
    messages: Array<Status>,
}

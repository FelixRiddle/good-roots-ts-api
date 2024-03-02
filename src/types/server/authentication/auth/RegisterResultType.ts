import Status from "../../../Status";

/**
 * The result type of register route
 */
export default interface RegisterResultType {
    userRegistered: boolean,
    messages: Array<Status>
}

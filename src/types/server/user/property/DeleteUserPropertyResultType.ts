import Status from "../../../Status";

export default interface DeleteUserPropertyResultType {
    propertyDeleted: boolean,
    messages: Array<Status>
}

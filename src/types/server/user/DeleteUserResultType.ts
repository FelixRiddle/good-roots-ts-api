import Status from "../../Status";

export default interface DeleteUserResultType {
    userDeleted: boolean,
    messages: Array<Status>
}

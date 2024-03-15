import Status from "../../../Status"

export default interface BackdoorConfirmEmailResultType {
    emailConfirmed: boolean,
    messages: Array<Status>
};

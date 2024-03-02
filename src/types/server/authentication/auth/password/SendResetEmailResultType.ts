import Status from "../../../../Status";

interface SendResetEmailResultType {
    resetEmailSent: boolean,
    messages: Array<Status>
}

export default SendResetEmailResultType;

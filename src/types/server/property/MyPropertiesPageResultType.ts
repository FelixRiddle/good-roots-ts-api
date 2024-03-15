import Status from "../../Status";
import PropertyCompleteType from "./PropertyCompleteType";

export default interface MyPropertiesPageResultType {
    properties: Array<PropertyCompleteType>,
    pages: number,
    total: number,
    offset: number,
    limit: number,
    messages: Array<Status>,
}

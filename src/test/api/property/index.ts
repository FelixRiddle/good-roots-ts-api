import { propertyApiBadTitle, propertyApiCreateTest } from "./create";
import { propertyApiDeleteTest } from "./delete";

/**
 * Property tests
 */
export default async function runAllPropertyTests() {
    await propertyApiCreateTest();
    await propertyApiBadTitle();
    await propertyApiDeleteTest();
}

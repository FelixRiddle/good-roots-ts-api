import { propertyApiBadTitle, propertyApiCreateTest } from "./create";

/**
 * Property tests
 */
export default async function runAllPropertyTests() {
    await propertyApiCreateTest();
    await propertyApiBadTitle();
}

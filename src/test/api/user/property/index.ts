import colors from "../../../../colors";
import { propertyApiBadTitle, propertyApiCreateTest } from "./create";
import { propertyApiDeleteTest } from "./delete";

/**
 * Property tests
 */
export default async function runAllPropertyTests() {
    console.log(colors.fg.magenta, 'Property', colors.fg.white);
    
    await propertyApiCreateTest();
    await propertyApiBadTitle();
    await propertyApiDeleteTest();
}

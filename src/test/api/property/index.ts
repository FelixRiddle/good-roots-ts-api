import PropertyAPI from "../../../api/property/PropertyAPI";
import colors from "../../../colors";
import { testMessage } from "../../testMessage";

/**
 * Get attributes
 */
async function getAttributes() {
    let ok = false;
    try {
        const api = new PropertyAPI();
        const attributes = await api.getAttributes();
        
        ok = attributes.prices && attributes.categories && attributes.categories.length > 0;
    } catch(err) {
        // Prevent erros from stopping tests
    }
    
    testMessage(ok, "Fetch attributes");
}

/**
 * Run all property tests
 */
export default async function runAllPropertyTests() {
    console.log(colors.fg.magenta, 'Public(endpoint) property', colors.fg.white);
    
    await getAttributes();
}

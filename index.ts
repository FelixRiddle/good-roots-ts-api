import ExpressAuthentication from "./src/api/auth/ExpressAuthentication";
import FrontendAuthAPI from "./src/api/auth/FrontendAuthAPI";
import SERVER_URL_MAPPINGS from "./src/mappings/env/SERVER_URL_MAPPINGS";
import AuthMarkupController from "./src/lib/frontendMarkupController/AuthMarkupController";

import UserData from "./src/types/UserData";

export {
    // Api's
    AuthMarkupController,
    ExpressAuthentication,
    FrontendAuthAPI,
    
    // Config/Maps
    SERVER_URL_MAPPINGS,
    
    // Types
    UserData,
}

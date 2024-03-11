import AuthMarkupController from "./lib/frontendMarkupController/AuthMarkupController";
import ExpressAuthentication from "./api/auth/ExpressAuthentication";
import FrontendAuthAPI from "./api/auth/FrontendAuthAPI";
import SERVER_URL_MAPPINGS from "./mappings/env/SERVER_URL_MAPPINGS";

// Register input type
import RegisterInputType from "./types/server/authentication/auth/RegisterInputType";
import { FieldTypes } from "./lib/frontendMarkupController/AuthMarkupController";

export default {
    // Api's
    ExpressAuthentication,
    FrontendAuthAPI,
    
    // Markup
    AuthMarkupController,
    
    // Config/Maps
    SERVER_URL_MAPPINGS,
}

export type {
    RegisterInputType,
    FieldTypes,
}

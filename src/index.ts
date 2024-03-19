import AuthMarkupController from "./lib/frontendMarkupController/AuthMarkupController";
import ExpressAuthentication from "./api/auth/ExpressAuthentication";
import FrontendAuthAPI from "./api/auth/FrontendAuthAPI";
import SERVER_URL_MAPPINGS from "./mappings/env/SERVER_URL_MAPPINGS";


// Images
import ImagesAPI from "./lib/property/images/ImagesAPI";
import GuestImagesAPI from "./lib/property/images/GuestImagesAPI";

import CarouselView from "./lib/property/views/CarouselView";

// Types
import RegisterInputType from "./types/server/authentication/auth/RegisterInputType";
import { FieldTypes } from "./lib/frontendMarkupController/AuthMarkupController";
import UserData from "./types/UserData";
import PropertyType from "./types/server/property/PropertyType";
import PropertyCompleteType from "./types/server/property/PropertyCompleteType";
import CompleteUserData from "./types/CompleteUserData";
import MyPropertiesPageResultType from "./types/server/user/property/MyPropertiesPageResultType";
import Status from "./types/Status";

export default {
    // Api's
    ExpressAuthentication,
    FrontendAuthAPI,
    
    CarouselView,
    ImagesAPI,
    GuestImagesAPI,
    
    // Markup
    AuthMarkupController,
    
    // Config/Maps
    SERVER_URL_MAPPINGS,
}

export type {
    // Data
    FieldTypes,
    RegisterInputType,
    
    CompleteUserData,
    UserData,
    MyPropertiesPageResultType,
    
    PropertyCompleteType,
    PropertyType,
    
    // Status
    Status,
}

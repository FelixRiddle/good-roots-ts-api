import AuthMarkupController from "./lib/frontendMarkupController/AuthMarkupController";
import ExpressAuthentication from "./api/auth/ExpressAuthentication";
import FrontendAuthAPI from "./api/auth/FrontendAuthAPI";
import PropertyAPI from "./api/property/PropertyAPI";
import SERVER_URL_MAPPINGS from "./mappings/env/SERVER_URL_MAPPINGS";
import UserAPI from "./api/user/UserAPI";

// Images
import ImagesAPI from "./lib/property/images/ImagesAPI";
import GuestImagesAPI from "./lib/property/images/GuestImagesAPI";

import CarouselView from "./lib/property/views/CarouselView";

// Types
import RegisterInputType from "./types/server/authentication/auth/RegisterInputType";
import PropertyType from "./types/server/property/PropertyType";
import PropertyCompleteType from "./types/server/property/PropertyCompleteType";
import CompleteUserData from "./types/CompleteUserData";
import MyPropertiesPageResultType from "./types/server/user/property/MyPropertiesPageResultType";
import Status from "./types/Status";
import FieldStatusType from "./types/status/FieldStatusType";
import FieldType from "./types/input/FieldType";

export {
    // Api's
    ExpressAuthentication,
    FrontendAuthAPI,
    PropertyAPI,
    UserAPI,
    
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
    FieldType,
    FieldStatusType,
    RegisterInputType,
    
    CompleteUserData,
    MyPropertiesPageResultType,
    
    PropertyCompleteType,
    PropertyType,
    
    // Status
    Status,
}

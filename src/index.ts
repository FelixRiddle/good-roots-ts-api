import AuthMarkupController from "./lib/frontendMarkupController/AuthMarkupController";
import ExpressAuthentication from "./api/auth/ExpressAuthentication";
import FrontendAuthAPI from "./api/auth/FrontendAuthAPI";
import PropertyAPI from "./api/property/PropertyAPI";
import SERVER_URL_MAPPINGS from "./mappings/env/SERVER_URL_MAPPINGS";
import UserAPI from "./api/user/UserAPI";
import createAxiosInstance from "./createAxiosInstance";
import ResetPasswordAPI from "./api/auth/password/ResetPasswordAPI";

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

const SERVERS_DEFAULT_LOCATION = {
    "good-roots": "http://localhost:3000",
    "express-authentication": "http://localhost:38001",
    "backdoor-server-access": "http://localhost:38002",
    "express-real-estate": "http://localhost:38003"
};

export {
    // Api's
    ExpressAuthentication,
    FrontendAuthAPI,
    PropertyAPI,
    UserAPI,
    ResetPasswordAPI,
    
    CarouselView,
    ImagesAPI,
    GuestImagesAPI,
    
    // Markup
    AuthMarkupController,
    
    createAxiosInstance,
    
    // Config/Maps
    // The same thing but well anyways, I don't have time to go around fixing code
    SERVERS_DEFAULT_LOCATION,
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

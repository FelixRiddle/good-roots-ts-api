const SERVER_URL_MAPPINGS = {
    // Frontends
    GOOD_ROOTS: process.env.GOOD_ROOTS_URL ? process.env.GOOD_ROOTS_URL : "http://localhost:3000",
    
    // Backends
    AUTHENTICATION: process.env.AUTHENTICATION_URL ? process.env.AUTHENTICATION_URL : "http://localhost:38001",
    BACKDOOR_SERVER_ACCESS: process.env.BACKDOOR_SERVER_ACCESS_URL ? process.env.BACKDOOR_SERVER_ACCESS_URL : "http://localhost:38002",
    REAL_ESTATE: process.env.REAL_ESTATE_URL ? process.env.REAL_ESTATE_URL : "http://localhost:38003"
};

export default SERVER_URL_MAPPINGS;

// This class makes use of leaflet, maybe it's better to separate it into another package
// or copy directly in the frontend.

// import PropertyAPI from "../../../api/property/PropertyAPI";
// import PropertyCompleteType from "../../../types/server/property/PropertyCompleteType";

// interface FilterType {
//     category?: number;
//     price?: number;
// }

// export default class PropertiesMap {
//     map = null;
//     filter: FilterType = {
//         category: undefined,
//         price: undefined,
//     };
    
//     showProperties: Array<PropertyCompleteType> = [];
//     markers = [];
//     debug = false;
    
//     properties: Array<PropertyCompleteType> = [];
    
//     constructor() {
//     }
    
//     /**
//      * Call at start
//      */
//     async start() {
//         this.createMapOn();
//         await this.fetchProperties();
        
//         this.updateMapMarkers();
//         this.setupFilters();
//     }
    
//     // --- Filters ---
//     /**
//      * Check if there's at least one filter
//      * 
//      * It uses an 'or' because it checks if at least ONE filter is on
//      */
//     filterExists() {
//         const customFilter = this.filter;
//         return typeof(customFilter.category) !== typeof(undefined) || typeof(customFilter.price) !== typeof(undefined);
//     }
    
//     /**
//      * Filter properties
//      * 
//      * After each filter update, or property update, call this function
//      */
//     filterProperties() {
//         const thisObj = this;
//         const customFilter = this.filter;
        
//         // Filter properties
//         const result = this.properties.filter((prop) => {
            
//             // Check that there's a custom filter
//             // If there's none, just return the property
//             if(!thisObj.filterExists()) {
//                 return prop;
//             }
            
//             // Filter by category
//             if(!customFilter.category) {
//                 // Check that the property category matches the filter category
//                 // For this we will return undefined for each property that doesn't matches
                
//                 // If they don't match, return undefined
//                 if(prop.category.id !== customFilter.category) {
//                     return;
//                 }
//             }
            
//             // Filter by price
//             if(!customFilter.price) {
//                 if(prop.price.id !== customFilter.price) {
//                     return;
//                 }
//             }
            
//             // Filters Ok
//             // Just return the property
//             return prop;
//         });
        
//         this.showProperties = result;
//     }
    
//     /**
//      * Enable filters
//      */
//     setupFilters() {
//         // Get category
//         const categoryElement = document.getElementById("category") as HTMLInputElement;
//         if(!categoryElement) {
//             console.warn("Category element not found, disabling filters!");
//             return;
//         }
        
//         // Get price
//         const priceElement = document.getElementById("price") as HTMLInputElement;
//         if(!priceElement) {
//             console.warn("Price element not found, disabling filters!");
//             return;
//         }
        
//         const thisObj = this;
        
//         // Enable setting filters for category
//         categoryElement.addEventListener("change", (e) => {
//             if(e.target && e.target.value) {
//                 thisObj.filter.category = parseInt(e.target.value);
                
//                 // Update markers
//                 thisObj.updateMapMarkers();
//             }
//         });
        
//         // Enable setting filters for price
//         priceElement.addEventListener("change", (e) => {
//             if(e.target && e.target.value) {
//                 thisObj.filter.price = parseInt(e.target.value);
                
//                 // Update markers
//                 thisObj.updateMapMarkers();
//             }
//         });
//     }
    
//     /**
//      * Create map
//      * 
//      * @param {string} elementId 
//      */
//     createMapOn(elementId="map") {
//         // Get price
//         const el = document.getElementById(elementId);
//         if(!el) {
//             console.warn("Element with id 'map' doesn't exists");
//             return;
//         }
        
//         const map = L.map(elementId).setView([37.7750224, -122.4536641], 13);
        
//         // This doesn't work
//         map.on("load", function (e) {
//             console.log(`Map loaded!`);
//         });
        
//         // Add tile layer
//         L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//             maxZoom: 19,
//             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//         }).addTo(map);
        
//         this.map = map;
//     }
    
//     // --- Property markers ---
//     /**
//      * Delete all markers
//      */
//     deleteAllMarkers() {
//         // Delete previous markers
//         if(this.markers.length > 0) {
//             for(const marker of this.markers) {
//                 this.map.removeLayer(marker);
//             }
//         }
//     }
    
//     /**
//      * Create filter markers
//      */
//     createFilterMarkers() {
//         if(this.debug) {
//             console.log(`Creating markers that pass the filters`);
//             console.log(`Properties: `, this.showProperties);
//         }
        
//         let index = 0;
//         for(const property of this.showProperties) {
            
//             if(this.debug) {
//                 console.log(`I(For each): ${index}`);
//                 console.log(`Current property: `, property);
//                 console.log(`Property name: ${property.title}`);
//             }
            
//             const marker = new L.marker([
//                 property.latitude,
//                 property.longitude
//             ], {
//                 autoPan: true,
//             }).addTo(this.map)
//             .bindPopup(`
//                 <p class="text-indigo-600 font-bold">${property.category.name}</p>
//                 <h1 class="text-xl font-extrabold uppercase my-2">${property.title}</h1>
                
//                 <!-- Image -->
//                 <img src="${property.images[0]}" alt="Image of the property ${property.title}"/>
                
//                 <p class="text-gray-600 font-bold">${property.price.name}</p>
//                 <a href="${location.origin}/property/view/${property.id}" class="bg-indigo-600 block p-2 text-center font-bold uppercase rounded">Go to property<a/>
//             `);
            
//             // Add to the list of markers
//             this.markers.push(marker);
            
//             index++;
//         }
//     }
    
//     /**
//      * Create markers for each property
//      * 
//      * @deprecated Use 'createFilterMarkers' instead
//      */
//     createPropertyMarkers() {
//         for(const property of this.properties) {
//             const marker = new L.marker([
//                 property.latitude,
//                 property.longitude
//             ], {
//                 autoPan: true,
//             }).addTo(this.map)
//             .bindPopup(`
//             <p class="text-indigo-600 font-bold">${property.category.name}</p>
//             <h1 class="text-xl font-extrabold uppercase my-2">${property.title}</h1>
//             <img src="" alt="Imagen de la propiedad ${property.title}"/>
//             <p class="text-gray-600 font-bold">${property.price.name}</p>
//             <a href="${location.origin}/property/view/${property.id}" class="bg-indigo-600 block p-2 text-center font-bold uppercase rounded">Go to property<a/>
//             `);
            
//             // Add to the list of markers
//             this.markers.push(marker);
//         }
//     }
    
//     /**
//      * Update map things
//      */
//     updateMapMarkers() {
//         if(!this.map) {
//             if(this.debug) {
//                 console.log(`The map doesn't exists!`);
//             }
            
//             // Don't proceed or it will crash everything.
//             return;
//         } else {
//             if(this.debug) {
//                 console.log(`Map ok, updating markers`);
//             }
//         }
        
//         // Filter properties 
//         this.filterProperties();
        
//         // Re-Create the markers
//         this.deleteAllMarkers();
//         this.createFilterMarkers();
        
//         if(this.debug) {
//             console.log(`Markers created!`);
//         }
//     }
    
//     // --- Api calls ---
//     /**
//      * Fetch properties
//      */
//     async fetchProperties() {
//         this.propertyApi = new PropertyAPI();
//         const resData = await this.propertyApi.fetchAll();
        
//         // Properties come with the images
//         const properties = resData.properties;
//         this.properties = properties;
        
//         // Update markers
//         this.updateMapMarkers();
//     }
// }

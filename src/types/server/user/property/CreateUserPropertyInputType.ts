
/**
 * These are the fields that the user is allowed to change
 */
export default interface CreateUserPropertyInputType {
    // Description
    title: string,
    description: string,
    rooms: number,
    parking: number,
    bathrooms: number,
    priceId: number,
    categoryId: number,
    
    // Location
    street: string,
    latitude: number,
    longitude: number,
}

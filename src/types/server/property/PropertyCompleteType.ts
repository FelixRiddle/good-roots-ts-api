import CategoryType from "./CategoryType"
import PriceType from "./PriceType"

/**
 * Property type
 */
export default interface PropertyCompleteType {
    id: number,
    uuid: string,
    title: string,
    description: string,
    rooms: number,
    parking: number,
    bathrooms: number,
    street: string,
    latitude: string,
    longitude: string,
    published: boolean,
    images?: Array<string>,
    
    // Composite types
    category: CategoryType,
    price: PriceType,
};

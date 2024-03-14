
/**
 * Property type
 */
export default interface PropertyType {
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
};

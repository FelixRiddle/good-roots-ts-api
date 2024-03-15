// Complete user data, with no missing fields
export default interface CompleteUserData {
    id: number,
    name: string,
    email: string,
    confirmedEmail: number,
    createdAt: Date,
    updatedAt: Date,
}

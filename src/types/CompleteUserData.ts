// User data without some sensitive information
export default interface CompleteUserData {
    id: number,
    name: string,
    email: string,
    confirmedEmail: number,
    createdAt: Date,
    updatedAt: Date,
}

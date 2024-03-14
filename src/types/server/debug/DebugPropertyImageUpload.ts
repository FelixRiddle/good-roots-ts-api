
/**
 * Debug property image upload class
 * 
 *      action: 'action name',
 *      imageName: 'image Name',
 *      title: 'title',
 *      status: 1,
 *      message: 'Message',
 */
export default interface DebugPropertyImageUploadType {
    title: string,
    message: string,
    status: number,
    imageNames: Array<string>,
    actionCourseUuid: string,
    actionStage: number,
}

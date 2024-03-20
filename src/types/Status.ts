/**
 * Status is the response from my endpoints
 * 
 * It reports the state of the request
 */
interface Status {
    error: boolean,
    message: string,
    // If it was an input field, then this is guaranteed
    field?: string,
    // Some messages should be notified, others not
    shouldNotify?: boolean,
}

export default Status;

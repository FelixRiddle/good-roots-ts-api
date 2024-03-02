/**
 * Status is the response from my endpoints
 * 
 * It reports the state of the request
 */
interface Status {
    error: boolean,
    message: string
}

export default Status;

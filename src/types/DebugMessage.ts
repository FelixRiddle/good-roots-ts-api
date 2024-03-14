// Notes
// // Deprecated
// // Use status instead
// error = false;

// // 1) Normal
// // 2) Success
// // 3) Warning
// // 4) Error
// // 5) Notification
// status = 1;

/**
 * 
 */
export default interface DebugMessage {
    message: string,
    error?: boolean,
    status: number,
};

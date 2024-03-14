/**
 * Message controller
 * 
 * Controller over a single message
 * 
 * I don't think current browsers like that you add and remove elements, maybe this is currently unusable.
 */
export default class MessageController {
    message = "";
    
    // Deprecated
    // Use status instead
    error = false;
    
    // 1) Normal
    // 2) Success
    // 3) Warning
    // 4) Error
    // 5) Notification
    status = 1;
    elementTag: string;
    element: HTMLInputElement | undefined;
    
    /**
     * 
     * @param {string} message Message
     * @param {bool} error Whether it's an error or not
     */
    constructor(message: string, status: number, elementTag: string ="li") {
        this.message = message;
        this.status = status;
        this.elementTag = elementTag;
    }
    
    /**
     * Create html element
     * 
     * It looks like this
     *  li
     *      span
     *          {message}
     * 
     * @returns {Element} The html element
     */
    createHtmlElement() {
        // Create new div element
        const messageElement = document.createElement(this.elementTag);
        
        // Create text container
        const textContainer = document.createElement("span");
        const textNode = document.createTextNode(this.message);
        console.log(`This message: `, this.message);
        
        messageElement.appendChild(textContainer);
        textContainer.appendChild(textNode);
        console.log(`Text container`);
        
        return messageElement;
    }
    
    /**
     * Create as an html element and insert into a given element
     */
    insertIntoHtml(elementId: string) {
        const element = document.getElementById(elementId) as HTMLInputElement;
        
        if(!element) {
            console.error("Couldn't create element");
            return;
        }
        
        console.log(`Element found, appending message`);
        this.element = element;
        
        const resultElement = this.createHtmlElement();
        console.log(`Element created: `, resultElement);
        
        // Insert element
        element.appendChild(resultElement);
    }
}

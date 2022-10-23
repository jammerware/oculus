/**
 * @private @property {document}
 */
export class HtmlService {
    _document;

    /**
     * @param {Document} document The current HTML document.
     */
    constructor(document) {
        if (!document) {
            throw new Error(`Can't initialize HtmlService without a document. You passed: ${document}`)
        }

        this._document = document;
    }

    /**
     * 
     * @param {keyof globalThis.HTMLElementTagNameMap} elementType The type of element to create.
     */
    createElement(elementType) {
        return this._document.createElement(elementType);
    }

    /**
     * @param {string} htmlString The string to elementize
     * 
     * @returns {DocumentFragment} A document fragment containing the element.
     */
    toElement(htmlString) {
        const template = this._document.createElement("template");
        template.innerHTML = htmlString;
        return template.content;
    }
}
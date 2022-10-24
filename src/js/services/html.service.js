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
     * @returns {Node | null} A document fragment containing the element.
     */
    toElementHtml(htmlString) {
        const placeHolder = this._document.createElement("div");
        placeHolder.innerHTML = htmlString.trim();
        return placeHolder.firstChild;
    }

    toElementText(htmlString) {
        const placeHolder = this._document.createElement("div");
        placeHolder.innerText = htmlString.trim();
        return placeHolder.firstChild;
    }
}
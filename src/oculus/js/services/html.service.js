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
     * @param {string} innerHtml - the raw html content that represents your new element.
     */
    createElement(innerHtml) {
        const el = this._document.createElement("div");
        el.innerHTML = innerHtml;
        return el.firstChild;
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
}
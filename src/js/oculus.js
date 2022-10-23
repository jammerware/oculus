// @ts-nocheck
import { Console } from "./console.js";
import { template } from './template.js';

/**
 * @property {ShadowRoot} _shadowRoot
 */
export class Oculus extends HTMLElement {
    _console = new Console("Oculus");
    _shadowRoot;
    _template_id = "oculus-template";

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const templateElement = document.createElement("template");
        templateElement.innerHTML = template;
        document.body.appendChild(templateElement);

        // now clone and attach the template
        const templateNode = templateElement.cloneNode(true);

        // now the template it is on the body - attach a clone of its baby to the shadow dom
        // javascript doesn't know that templateNode has a content property? 🤔
        const shadowClone = templateNode['content'];
        this._shadowRoot.appendChild(shadowClone);

        // let's style
        // longterm: compiletime cdn stuff, or whatever?
        // TBD
    }

    /**
     * @param {Node} styleRoot 
     */
    _loadStyles(styleRoot) {
        if (!styleRoot) {
            this._console.logError("Couldn't find the style root.");
        }

        // append tailwind styles

    }
}
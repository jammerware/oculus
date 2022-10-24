// @ts-nocheck
import { CssService } from "../../js/services/css.service.js";
import { HtmlService } from "../../js/services/html.service.js";
import { Logger } from "../../js/services/logger.js";
import { ServiceContainer } from "../../js/services/service.container.js";
import { OculusCodeTemplate } from './oculus.code.template.js';

/**
 * @private @property {ServiceContainer} _serviceContainer Contains the services used herein.
 * @private @property {ShadowRoot} _shadowRoot
 */
export class OculusCode extends HTMLElement {
    _services = new ServiceContainer()
    _shadowRoot;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._services = new ServiceContainer(
            new CssService(new Logger()),
            document,
            document.defaultView.hljs,
            new HtmlService(document),
            new Logger(this)
        );

        this._shadowRoot.addEventListener("slotchange", this._onSlotChange.bind(this));
    }

    async connectedCallback() {
        const templateElement = this._services.html.toElementHtml(OculusCodeTemplate);
        const templateFragment = document.body.appendChild(templateElement);

        // now clone and attach the template
        const templateNode = templateFragment.content.cloneNode(true);
        this._shadowRoot.appendChild(templateNode);

        const style = document.createElement("link");
        style.setAttribute("rel", "stylesheet");
        style.setAttribute("href", "./elements/oculus.code/oculus.code.css");
        this._shadowRoot.append(style);

        const highlightJs = document.createElement("script");
        highlightJs.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js");
        this._shadowRoot.append(highlightJs);

        const activateHighlightJs = document.createElement("script");
        activateHighlightJs.setAttribute("src", "js/activate.hljs.js");
        activateHighlightJs.setAttribute("type", "module");
        activateHighlightJs.setAttribute("defer", "defer");
        this._shadowRoot.append(activateHighlightJs);
    }

    /**
     * 
     * 
     * @param {Event} event 
     */
    _onSlotChange(event) {
        const codeElement = this._shadowRoot.querySelector("pre");
        console.log("code is", this._shadowRoot.querySelector("code"));
        if (!codeElement) {
            this._services.logger.log("Skipped code this time...");
            return;
        }

        this._services.hljs.highlightElement(codeElement, { language: "js" });
        this._services.logger.log("highlighting", codeElement);
    }
}
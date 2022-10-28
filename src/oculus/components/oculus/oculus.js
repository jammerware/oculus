// @ts-nocheck
import { HtmlService } from "../../js/services/html.service.js";
import { Logger } from "../../js/services/logger.js";
import { ServiceContainer } from "../../js/services/service.container.js";
import * as template from "./oculus.template.html";

/**
 * @private @property {Console} _console A logging console. It's mine, not yours. Don't touch.
 * @private @property {ServiceContainer} _serviceContainer Contains the services used herein.
 * @private @property {ShadowRoot} _shadowRoot
 */
export class Oculus extends HTMLElement {
    _services = new ServiceContainer()
    _shadowRoot;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._services = new ServiceContainer(
            new CssService(new Logger()),
            document,
            new HtmlService(document),
            new Logger(this)
        );
    }

    async connectedCallback() {
        const templateElement = this._services.html.toElement(template);
        const templateFragment = document.body.appendChild(templateElement);

        // now clone and attach the template
        const templateNode = templateFragment.content.cloneNode(true);
        this._shadowRoot.appendChild(templateNode);

        const style = document.createElement("link");
        style.setAttribute("rel", "stylesheet");
        style.setAttribute("href", "css/oculus.css");
        this._shadowRoot.append(style);

        const highlightJs = document.createElement("script");
        highlightJs.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js");
        this._shadowRoot.append(highlightJs);

        const activateHighlightJs = document.createElement("script");
        activateHighlightJs.setAttribute("src", "js/index.js");
        activateHighlightJs.setAttribute("type", "module");
        activateHighlightJs.setAttribute("defer", "defer");
        this._shadowRoot.append(activateHighlightJs);
    }
}
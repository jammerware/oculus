// @ts-nocheck
import { CssService } from "./css.service.js";
import { HtmlService } from "./html.service.js";
import { Logger } from "./logger.js";
import { ServiceContainer } from "./service.container.js";
import { template } from './template.js';

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
        const cssText = await this._services.css.load(
            "css/tw.css",
            "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css",
            "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/github.min.css",
            "css/oculus.css"
        );
        const styleRoot = this._shadowRoot.querySelector("style");
        // const styleElement = this._services.html.createElement("style");
        // styleRoot.appendChild(styleElement);
        styleRoot.innerText = cssText;

        const scriptRoot = this._shadowRoot.querySelector("#oculus-script-root");
        const scriptElement = this._services.html.toElement('<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"></script>');
        scriptRoot.appendChild(scriptElement);
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

    // time for fake DI
    _init() {

    }
}
// @ts-nocheck
import { HtmlService } from "../../js/services/html.service.js";
import { Logger } from "../../js/services/logger.js";
import { ServiceContainer } from "../../js/services/service.container.js";
import * as Prism from '../../js/services/prism.js'
import * as template from "./oculus-code-renderer.template.html";

class OcCodeRenderer extends HTMLElement {
    constructor() {
        super();

        // build services
        this._services = new ServiceContainer(
            window.document,
            new HtmlService(window.document),
            new Logger(),
            Prism
        );

        // INTO THE SHADOW
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        // load the template and append it to the document
        const templateElement = this._services.html.createElement(template.default);
        this._services.document.body.appendChild(templateElement);

        // then append a clone to the shadowroot
        this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

        const codeElement = this.shadowRoot.querySelectorAll("code")[0];
        const language = this.getAttribute("language");

        codeElement.innerHTML = window.Prism.highlight(this.innerHTML, window.Prism.languages[language], language).trim();
    }
}

customElements.define("oc-code-renderer", OcCodeRenderer);
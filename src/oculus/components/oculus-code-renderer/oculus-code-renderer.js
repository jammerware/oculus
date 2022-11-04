// @ts-nocheck
import * as PrismJs from "prismjs";
import { HtmlService } from "../../js/services/html.service.js";
import { Logger } from "../../js/services/logger.js";
import { ServiceContainer } from "../../js/services/service.container.js";
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
        this.shadowRoot.appendChild(templateElement.content.cloneNode(true));
        console.log("template appended");

        const lines = this.innerHTML.split("\n");
        const shittyLines = 0;

        for (let line in lines) {
            if (line.trim() == "") {
                shittyLines++;
            }
            else { break }
        }

        lines.splice(0, shittyLines + 1);
        const numberOfSpacesInFirstLine = lines[0].match(/(?<spaces>^\s*)/m)?.groups?.spaces?.length || 0;
        const fixedLines = [];

        for (let line of lines) {
            let spaceCount = 0;

            const spaceMatch = line.match(/^(?<lineBeginningSpaces>\s+)/m);
            let numbaOfspacesInnaLine = 0;

            if (spaceMatch?.groups?.lineBeginningSpaces) {
                numbaOfspacesInnaLine = spaceMatch.groups.lineBeginningSpaces.length;
            }

            const minSpaces = Math.min(numbaOfspacesInnaLine, numberOfSpacesInFirstLine);
            line = line.substring(minSpaces);
            fixedLines.push(line);
        }

        const allLines = fixedLines.join("\r\n");
        const codeElement = this.shadowRoot.querySelector("code");
        const language = this.getAttribute("language");
        codeElement.setAttribute("language", this.getAttribute("language"));

        // loadLanguages([language]);
        const innerHtml = PrismJs.highlight(allLines, window.Prism.languages[language], language)
            .trim();

        // then append a clone to the shadowroot
        codeElement.innerHTML = innerHtml;
    }
}

customElements.define("oc-code-renderer", OcCodeRenderer);

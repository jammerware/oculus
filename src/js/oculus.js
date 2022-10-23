// @ts-nocheck
import { Console } from "./console.js";
import { FileService } from "./file.service.js";
import { template } from './template.js';

// import loadTemplate from "../ts/template.service.js";

// export default async function loadTemplate(templatePath: string, baseUrl: string): Promise<string> {
//     const url = new URL(templatePath, baseUrl).href;
//     const response = await fetch(url);
//     return await response.text();
// }

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

        // now clone 
        const templateNode = templateElement.cloneNode(true);

        // if (!templateNode) {
        //     this._console.logError(`Couldn't load the template from element #${this._template_id}`);
        // }

        this._shadowRoot.appendChild(templateNode['content']);


        // however i solve the template problem, once we have it, the next step is to select stuff
        // i can get the individual elements inside the shadow dom by selecting off of
        // templateNode.content.querySelector()
        // @ts-ignore
        //        console.log(templateNode?.cloneNode(true));
        // this._shadowRoot = this.attachShadow({ mode: "open" })
        //     .append(templateNode?.firstChild?.cloneNode(true));
        // this._shadowRoot.

        //     // @ts-ignore
        //     .append(templateNode);

        // console.log('appended', templateNode);
    }

    init() {


        // const nodeTemplate = document.createElement("template");
        // const templateHtml = await loadTemplate("./templates/oculus.template.html", document.baseURI);
        // nodeTemplate.innerHTML = templateHtml.trim();
        // document.body.append(nodeTemplate);

        // // we have to clone the node to get a copy with deep references (to the elements we need to manipulate)
        // const node = nodeTemplate.cloneNode(true).firstChild;

        // // this._shadowDom.append(node);
        // this._shadowDom.append(node!);
        // this._console.log("did we", node);
        // this._console.log(node);
        // first, append the template for later use
        // (this is going to result in a template per instance, which isn't great)
        // const appendedNode = node.cloneNode(true);
        // this._shadowDom?.appendChild(document.importNode(appendedNode, true));
        // // find the root so we can things
        // const elementRoot = node.querySelector("#oculus-root")?.cloneNode(true);
        // const styleRoot = node.querySelector("style");

        // this._console.log("elementroot", elementRoot);
        // this._console.log("styleroot", styleRoot);

        // styleRoot!.innerText = `a { color: blue }`;

        // const oculusContentRoot = node.querySelector("#oculus-content-root");
        // this._shadowDom.innerHTML = templateHtml;


        // load styles
        // this.loadStyles(this._shadowDom.querySelector("style"));
        //const oculusContentRoot = node.firstChild?.cloneNode(true);
        // console.log('root', oculusContentRoot);

        // if (!oculusContentRoot) {
        //     this._console.logError("Couldn't clone the custom element root.");
        // }
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
import { Console } from "./console.js";
import loadTemplate from "./template.service.js";

export class Oculus extends HTMLElement {
    private _console = new Console<Oculus>(Oculus);

    constructor() {
        super();

        this._console.log("Did we make it?");
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        loadTemplate("../templates/oculus.template.html", document.baseURI).then(template => {
        //     this._console.log(template);
            // const node = document.importNode(template, true);
            // this.shadowRoot?.appendChild(node);
            // this._console.log("Startup", new Date());
        });
    }
}
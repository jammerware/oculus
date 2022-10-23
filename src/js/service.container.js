import { Logger } from './logger.js';
import { HtmlService } from './html.service.js';
import { CssService } from './css.service.js';

/**
 * A fake DI container for the Oculus class. I might write tests someday. Who knows?
 * Not you. Not me.
 * 
 * @property {CssService} css The CSS Service. Loads CSS from URLs and concatenates them so we can dump them in the template.
 * @property {Document} document The current HTML document.
 * @property {HtmlService} html The HTML service
 * @property {Logger} logger Your friendly neighborhood logger.
 */
export class ServiceContainer {
    css;
    document;
    html;
    logger;

    /**
     * @param {CssService} css The CSS service.
     * @param {Document} document The current document.
     * @param {HtmlService} html The HTML service.
     * @param {Logger} logger The console/logging service.
     */
    constructor(
        css,
        document,
        html,
        logger
    ) {
        this.css = css;
        this.document = document;
        this.logger = logger;
        this.html = html;
    }
}
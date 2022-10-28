import { Logger } from './logger.js';
import { HtmlService } from './html.service.js';
import Prism from './prism.js';

/**
 * A fake DI container for the Oculus class. I might write tests someday. Who knows?
 * Not you. Not me.
 * 
 * @property {Document} document The current HTML document.
 * @property {HtmlService} html The HTML service
 * @property {Logger} logger Your friendly neighborhood logger.
 * @property {Prism} prism The Prism.js instance
 */
export class ServiceContainer {
    document;
    html;
    logger;
    prism;

    /**
     * @param {Document} document The current document.
     * @param {HtmlService} html The HTML service.
     * @param {Logger} logger The console/logging service.
     * @param {Prism} prism An instance of Prism.js, those brilliant people, them.
     */
    constructor(
        document,
        html,
        logger,
        prism
    ) {
        this.document = document;
        this.logger = logger;
        this.html = html;
    }
}
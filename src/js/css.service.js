import { Logger } from './logger.js';

/**
 * @private @property {Logger}
 */
export class CssService {
    _logger;

    /**
     * @param {Logger} logger Your friendly neighborhood logger.
     */
    constructor(logger) {
        // TODO, this is gross
        logger.setOwner(this);
        this._logger = logger;
    }

    /**
     * @param {string[]} styleUrls Urls to the style resourcse to be concatenated and dumped in.
     */
    async load(...styleUrls) {
        if (!styleUrls || !styleUrls.length) {
            this._logger.logError(`Need at least one styleUrl to build. You passed: ${styleUrls}`);
        }

        const styleStrings = await Promise.all(styleUrls.map(async url => {
            const res = await fetch(url);
            return res.text()
        }));

        return styleStrings.join("\n").trim();
    }
}
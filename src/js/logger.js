/**
 * @private @property _owner The entity which owns the logger.
 */
export class Logger {
    _owner = "Logger";

    /**
     * @param {object} loggingEntity The entity using the logger.
     */
    constructor(loggingEntity) {
        // TODO gross
        this._owner = loggingEntity?.constructor.name || "Logger";
    }

    /**
     * @param {any[]} messages
     */
    log(...messages) {
        const prepended = this._prepend(messages);
        console.log(`[${prepended[0]}]:`, ...prepended.slice(1));
    }

    /**
     * @param {any} message 
     * @throws {Error}
     */
    logError(message) {
        console.error(this._prepend(message));
        throw new Error(message);
    }

    /**
     * Set the logging owner. This is a little iffy architecturally.
     * 
     * // TODO
     * 
     * @param {object} owner The logging owner.
     */
    setOwner(owner) {
        this._owner = owner.constructor.name;
    }

    /**
     * 
     * @param {any} message messages to log
     * @returns {any[]} messages to log
     */
    _prepend(message) {
        return [`${this._owner}`].concat(message);
    }
}
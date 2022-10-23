export class Console {
    _loggingName = "Console";

    /**
     * @param {object} loggingEntity The entity using the logger.
     */
    constructor(loggingEntity) {
        this._loggingName = loggingEntity.constructor.name;
    }

    /**
     * @param {any[]} messages
     */
    log(messages) {
        const prepended = this._prepend(messages);
        console.log(prepended[0], prepended.slice(1));
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
     * 
     * @param {any} message messages to log
     * @returns {any[]} messages to log
     */
    _prepend(message) {
        return [`${this._loggingName}`].concat(message);
    }
}
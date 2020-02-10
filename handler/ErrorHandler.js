const logger = require('../lib/log')

class ErrorHandler {
    constructor(props) {
        this.message = props.message
        this.trace = props.stack
        logger.error({ message: `[Error] ${this.message}`, trace: this.trace });
        return this;
    }
}

module.exports = ErrorHandler;
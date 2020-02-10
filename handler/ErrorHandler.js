class ErrorHandler {
    constructor(props) {
        this.message = props.message
        this.trace = props.stack
        console.error(`[Error] ${this.message}`)
        return this;
    }
}
 
module.exports = ErrorHandler;
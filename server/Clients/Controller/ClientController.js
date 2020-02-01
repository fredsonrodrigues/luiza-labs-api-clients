const Client = require('../Model/Client')

module.exports = {

    getClient = async (request, h) => {
        try {
            if (request.params.id !== undefined) {
                let response = await Client.findById(request.params.id).exec();
            } else {
                var response = await Client.find().exec();
            }
            return h.response(response);
        } catch (error) {
            return h.response(error).code(500);
        }
    }
}
const Client = require('../Model/Client')

module.exports = {

    getClient: async (request, h) => {
        try {
            if (request.params.id !== undefined) {
                var response = await Client.findById(request.params.id).exec();
            } else {
                var response = await Client.find().exec();
            }
            return h.response(response);
        } catch (error) {
            return h.response(error).code(500);
        }
    },

    saveClient: async (request, h) => {
        try {
            var client = new Client(request.payload);
            var response = await client.save();
            return h.response(response);
        } catch (error) {
            return h.response(error).code(500);
        }
    },

    updateClient: async (request, h) => {
        try {
            var result = await Client.findByIdAndUpdate(request.params.id, request.payload, { new: true });
            return h.response(result);
        } catch (error) {
            return h.response(error).code(500);
        }
    },

    deleteClient: async (request, h) => {
        try {
            var result = await Client.findOneAndDelete({_id: request.params.id}).exec();
            return h.response(result);
        } catch (error) {
            return h.response(error).code(500);
        }
    }
}
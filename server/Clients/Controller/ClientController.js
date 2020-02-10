const Client = require('../Model/Client')
const ErrorHandler = require('../../../handler/ErrorHandler')

module.exports = {

    getClient: async (request, h) => {
        try {
            var response = await Client.getAllWithFavorites(request.params.id, request.query.page);
            return h.response(response);
        } catch (error) {
            return h.response(new ErrorHandler(error)).code(500);
        }
    },

    saveClient: async (request, h) => {
        try {
            var client = new Client(request.payload);
            var response = await client.save();
            return h.response(response);
        } catch (error) {
            return h.response(new ErrorHandler(error)).code(500);
        }
    },

    addFavorite: async (request, h) => {
        try {
            var result = await Client.addFavorite(request.params.id, request.payload.favorite_id);
            return h.response(result);
        } catch (error) {
            return h.response(new ErrorHandler(error)).code(500);
        }
    },

    updateClient: async (request, h) => {
        try {
            var result = await Client.findByIdAndUpdate(request.params.id, request.payload, { new: true });
            return h.response(result);
        } catch (error) {
            return h.response(new ErrorHandler(error)).code(500);
        }
    },

    removeFavorite: async (request, h) => {
        try {
            var result = await Client.removeFavorite(request.params.id, request.payload.favorite_id);
            return h.response(result);
        } catch (error) {
            return h.response(new ErrorHandler(error)).code(500);
        }
    },

    deleteClient: async (request, h) => {
        try {
            var result = await Client.findOneAndDelete({_id: request.params.id}).exec();
            return h.response(result);
        } catch (error) {
            return h.response(new ErrorHandler(error)).code(500);
        }
    }
}
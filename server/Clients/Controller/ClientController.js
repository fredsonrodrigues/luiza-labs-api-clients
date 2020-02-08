const { Client, Favorite } = require('../Model/Client')

module.exports = {

    getClient: async (request, h) => {
        try {
            if (request.params.id !== undefined) {
                var response = await Client.findById(request.params.id).populate('favorites').exec();
            } else {
                var response = await Client.find().populate('favorites').exec();
            }
            return h.response(response);
        } catch (error) {
            return h.response(error).code(500);
        }
    },

    saveClient: async (request, h) => {
        try {
            let client_to_save = { ...request.payload }
            var client = new Client(client_to_save);
            let fav = []
            if (request.payload.favorites.length > 0) {
                fav = request.payload.favorites.map(e => {
                    let f = new Favorite({
                        client: client._id,
                        ...e
                    })
                    f.save((err) => {
                        if (err) return false;
                    })
                    return f;
                })
            }
            client.favorites = fav
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
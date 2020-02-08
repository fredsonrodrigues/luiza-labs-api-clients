const { Schema, model } = require(`../../../lib/mongo`)
const fetch = require("node-fetch");

var clientSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    favorites: { type: Array }
});

clientSchema.statics.getAllWithFavorites = async function (id = undefined) {
    try {
        if (id !== undefined) {
            var response = await this.model('Client').findById(id).exec();
        } else {
            var response = await this.model('Client').find().exec();
        }
        return response
    } catch (error) {
        throw new Error(error.message)
    }
};

clientSchema.statics.removeFavorite = async function (id_client, id_favorite) {
    try {
        var client = await this.model('Client').findById(id_client).exec();
        var hasEqual = client.favorites.filter((f) => f === id_favorite)
        if (hasEqual.length !== 0) {
            client.favorites = client.favorites.filter((f) => f !== id_favorite)
            var result = await Client.findByIdAndUpdate(id_client, client, { new: true });
            return result
        }
        return { message: "Esse favorito não existe." }
    } catch (error) {
        throw new Error(error.message)
    }
}

clientSchema.statics.addFavorite = async function (id_client, id_favorite) {
    try {
        var client = await this.model('Client').findById(id_client).exec();
        var hasEqual = client.favorites.filter((f) => f === id_favorite)
        if (hasEqual.length === 0) {
            client.favorites.push(id_favorite)
            var result = await Client.findByIdAndUpdate(id_client, client, { new: true });
            return result
        }
        return { message: "Já existe!" }
    } catch (error) {
        throw new Error(error.message)
    }
}

var Client = model('Client', clientSchema);

module.exports = Client
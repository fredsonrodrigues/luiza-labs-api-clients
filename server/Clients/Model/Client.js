const { Schema, model } = require(`../../../lib/mongo`)
var mongoosePaginate = require('mongoose-paginate');
const { getDetailsFromApi, verify } = require('../Service/')

var clientSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    favorites: { type: Array }
});

clientSchema.plugin(mongoosePaginate);

clientSchema.post('findOne', getDetailsFromApi);

clientSchema.statics.getAllWithFavorites = async function (id = undefined, pag = undefined) {
    try {
        if (id !== undefined) {
            var response = await this.model('Client').findOne({ _id: id }).exec();
        } else if (pag) {
            var response = await this.model('Client').paginate({}, { page: parseInt(pag), limit: 10 });
        } else {
            var response = { message: "Não é possível retornar resultados sem paginar." }
        }
        return response
    } catch (error) {
        throw new Error(error.message)
    }
};

clientSchema.statics.removeFavorite = async function (id_client, id_favorite) {
    try {
        var client = await this.model('Client').findById(id_client).exec();
        if (client === null) {
            throw new Error("Não há Cliente com esse Id")
        }
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
        if (client === null) {
            throw new Error("Não há Cliente com esse Id")
        }
        var hasEqual = client.favorites.filter((f) => f === id_favorite)
        if (hasEqual.length === 0) {
            let request_verify = await verify(id_favorite)
            if (!request_verify) {
                throw new Error("Produto não encontrado.")
            }
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
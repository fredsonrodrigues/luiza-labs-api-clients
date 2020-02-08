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
var Client = model('Client', clientSchema);

module.exports = Client
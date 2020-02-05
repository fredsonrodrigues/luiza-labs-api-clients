const { Schema, model } = require(`../../../lib/mongo`)

var clientSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Favorite' }]
});

const favoriteSchema = Schema({
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    favorite_id: {type: String, unique: true},
});

var Favorite = model('Favorite', favoriteSchema);
var Client = model('Client', clientSchema);
module.exports = {
    Client,
    Favorite
}
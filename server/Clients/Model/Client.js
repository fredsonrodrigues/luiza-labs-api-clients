const mongoose = require(`../../../lib/mongo`)

var clientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorite' }]
});

const favoriteSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    favorite_id: {type: String, unique: true},
});

clientSchema.pre('findOneAndDelete', { document: true }, async function(next) {
    const docToDelete = await this.model.findOne(this.getQuery());
    Favorite.remove({client: docToDelete._id}).exec();
    console.log("Removing childs")
    next();
})

var Favorite = mongoose.model('Favorite', favoriteSchema);
var Client = mongoose.model('Client', clientSchema);

module.exports = {
    Client,
    Favorite
}
const { Schema, model } = require(`../../../lib/mongo`)

var clientSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true}
});

var Client = model('Client', clientSchema);
module.exports = Client
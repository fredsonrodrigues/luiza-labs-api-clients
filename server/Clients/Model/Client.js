var clientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true}
});

var Client = mongoose.model('Client', clientSchema);
module.exports = Client
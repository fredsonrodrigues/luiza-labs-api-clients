const { Schema, model } = require(`../../../lib/mongo`)
const axios = require('axios')

var clientSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    favorites: { type: Array }
});

clientSchema.post('find', function (doc) {
    doc.map((e, k) => {
        const promises = e.favorites.map(fav => new Promise((resolve, reject) => {
            var url = `http://challenge-api.luizalabs.com/api/product/${fav}`;
            axios(url).then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error;
            })
        }));

        Promise.all(promises).then(results => {
            console.log(results)
            doc[k].favorites = results
        });
    })
});

var Client = model('Client', clientSchema);
module.exports = Client
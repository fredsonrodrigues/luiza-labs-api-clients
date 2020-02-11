const fetch = require("node-fetch");

module.exports = {
    verify: async (id_favorite) => {
        let request_verify = await fetch(`http://challenge-api.luizalabs.com/api/product/${id_favorite}`)
        if (request_verify.status !== 200) {
            return false
        }
        return true
    },

    getDetailsFromApi: (result, next) => {
        let fav = []
        if (process.env.CONSULT_PRODUCT !== 'false') {
            result.favorites.map(f => {
                fetch(`http://challenge-api.luizalabs.com/api/product/${f}`)
                    .then(resp => resp.json())
                    .then(json => {
                        fav.push(json)
                    })
                    .catch(e => {
                        fav.push({ id: f })
                    }).then(() => {
                        if (fav.length === result.favorites.length) {
                            result.favorites = fav
                            next()
                        }
                    })
            })
        } else {
            next()
        }
    }
}
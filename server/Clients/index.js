const routes = require('./routes')

var baseRoutes = {
    name: 'Clients',
    version: '1.0.0',
    register: function (server, options) {
        server.route(routes)
    }
}

module.exports = baseRoutes  
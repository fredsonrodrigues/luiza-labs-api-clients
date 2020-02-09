const routes = require('./routes')

var baseRoutes = {
    name: 'Login',
    version: '1.0.0',
    register: function (server, options) {
        server.route(routes)
    }
}

module.exports = baseRoutes  
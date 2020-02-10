const ClientController = require('./Controller/ClientController')

const baseRoute = '/clients'
const routes = [
    {
        method: 'GET',
        path: `${baseRoute}`,
        config: { auth: 'jwt' },
        handler: ClientController.getClient
    },
    {
        method: 'GET',
        path: `${baseRoute}/{id}`,
        config: { auth: 'jwt' },
        handler: ClientController.getClient
    },
    {
        method: 'POST',
        path: `${baseRoute}`,
        config: { auth: 'jwt' },
        handler: ClientController.saveClient
    },
    {
        method: 'POST',
        path: `${baseRoute}/{id}/favorite`,
        config: { auth: 'jwt' },
        handler: ClientController.addFavorite
    },
    {
        method: 'PUT',
        path: `${baseRoute}/{id}`,
        config: { auth: 'jwt' },
        handler: ClientController.updateClient
    },
    {
        method: 'DELETE',
        path: `${baseRoute}/{id}/favorite`,
        config: { auth: 'jwt' },
        handler: ClientController.removeFavorite
    },
    {
        method: 'DELETE',
        path: `${baseRoute}/{id}`,
        config: { auth: 'jwt' },
        handler: ClientController.deleteClient
    }
]
module.exports = routes
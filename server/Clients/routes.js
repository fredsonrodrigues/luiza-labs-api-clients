const ClientController = require('./Controller/ClientController')

const baseRoute = '/clients'
const routes = [
    {
        method: 'GET',
        path: `${baseRoute}`,
        handler: ClientController.getClient
    },
    {
        method: 'GET',
        path: `${baseRoute}/{id}`,
        handler: ClientController.getClient
    },
    {
        method: 'POST',
        path: `${baseRoute}`,
        handler: ClientController.saveClient
    },
    {
        method: 'PUT',
        path: `${baseRoute}/{id}`,
        handler: ClientController.updateClient
    },
    {
        method: 'DELETE',
        path: `${baseRoute}/{id}`,
        handler: ClientController.deleteClient
    }
]
module.exports = routes
const baseRoute = '/clients'
const routes = [
    {
        method: 'GET',
        path: `${baseRoute}`,
        handler: (request, h) => {
            return 'client GET';
        }
    },
    {
        method: 'GET',
        path: `${baseRoute}/{id}`,
        handler: (request, h) => {
            return 'client POST';
        }
    },
    {
        method: 'POST',
        path: `${baseRoute}`,
        handler: (request, h) => {
            return 'client POST';
        }
    },
    {
        method: 'PUT',
        path: `${baseRoute}/{id}`,
        handler: (request, h) => {
            return 'client PUT';
        }
    },
    {
        method: 'DELETE',
        path: `${baseRoute}/{id}`,
        handler: (request, h) => {
            return 'client DELETE';
        }
    }
]
module.exports = routes
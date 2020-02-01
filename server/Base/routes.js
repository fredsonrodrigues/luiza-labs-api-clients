const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    }
]
module.exports = routes
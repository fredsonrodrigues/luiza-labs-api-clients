const UserController = require('./Controller/UserController')

const baseRoute = '/auth'
const routes = [
    {
        method: 'POST',
        path: `${baseRoute}/login`,
        config: { auth: false },
        handler: UserController.findUser
    }
]
module.exports = routes
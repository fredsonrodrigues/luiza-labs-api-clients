const UserController = require('./Controller/UserController')
const Joi = require('@hapi/joi')

const baseRoute = '/auth'
const routes = [
    {
        method: 'POST',
        path: `${baseRoute}/login`,
        handler: UserController.findUser,
        config: {
            auth: false,
            tags: ['api'],
            description: 'Auth',
            notes: 'Faz o login na aplicação',
            validate: {
                payload: Joi.object({
                    name: Joi.string(),
                    password: Joi.string()
                })
            }    
        }
    }
]
module.exports = routes
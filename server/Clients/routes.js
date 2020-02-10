const ClientController = require('./Controller/ClientController')
const Joi = require('@hapi/joi')

const baseRoute = '/clients'
const routes = [
    {
        method: 'GET',
        path: `${baseRoute}`,
        handler: ClientController.getClient,
        config: {
            tags: ['api'],
            auth: 'jwt' ,
            description: 'Get all Clients',
            notes: 'Retorna todos os clientes. ATENÇÃO: Usar Paginação',
            validate: {
                query: Joi.object({
                    page : Joi.number()
                            .required()
                            .description('the id for the Client page'),
                })
            }      
        }
    },
    {
        method: 'GET',
        path: `${baseRoute}/{id}`,
        handler: ClientController.getClient,
        config: {
            tags: ['api'],
            auth: 'jwt' ,
            description: 'Get one Client',
            notes: 'Retorna Um cliente específico',
            validate: {
                params: Joi.object({
                    id : Joi.string()
                            .required()
                            .description('the id for the Client item'),
                })
            }    
        }
    },
    {
        method: 'POST',
        path: `${baseRoute}`,
        handler: ClientController.saveClient,
        config: {
            tags: ['api'],
            auth: 'jwt' ,
            description: 'Create new Client',
            notes: 'Cria um novo Cliente',
            validate: {
                payload: Joi.object({
                    name: Joi.string(),
                    email: Joi.string()
                })
            }    
        }
    },
    {
        method: 'POST',
        path: `${baseRoute}/{id}/favorite`,
        handler: ClientController.addFavorite,
        config: {
            tags: ['api'],
            auth: 'jwt' ,
            description: 'Add Favorite To Client',
            notes: 'Adiciona na lista de favoritos do Cliente',    
        }
    },
    {
        method: 'PUT',
        path: `${baseRoute}/{id}`,
        handler: ClientController.updateClient,
        config: {
            tags: ['api'],
            auth: 'jwt' ,
            description: 'Update a Client',
            notes: 'Atualiza Cliente Existente',    
        }
    },
    {
        method: 'DELETE',
        path: `${baseRoute}/{id}/favorite`,
        handler: ClientController.removeFavorite,
        config: {
            tags: ['api'],
            auth: 'jwt' ,
            description: 'Remove Favorite To Client',
            notes: 'Remove da lista de favoritos do Cliente',    
        }
    },
    {
        method: 'DELETE',
        path: `${baseRoute}/{id}`,
        handler: ClientController.deleteClient,
        config: {
            tags: ['api'],
            auth: 'jwt' ,
            description: 'Remove Client',
            notes: 'Remove completamente um Cliente',    
        }
    }
]
module.exports = routes
const ClientController = require('./Controller/ClientController')
const Joi = require('@hapi/joi')

const baseRoute = '/clients'
const routes = [
    {
        method: 'GET',
        path: `${baseRoute}`,
        config: { auth: 'jwt' },
        handler: ClientController.getClient,
        config: {
            tags: ['api'],
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
        config: { auth: 'jwt' },
        handler: ClientController.getClient,
        config: {
            tags: ['api'],
            description: 'Get one Client',
            notes: 'Retorna Um cliente específico',
            validate: {
                params: Joi.object({
                    id : Joi.number()
                            .required()
                            .description('the id for the Client item'),
                })
            }    
        }
    },
    {
        method: 'POST',
        path: `${baseRoute}`,
        config: { auth: 'jwt' },
        handler: ClientController.saveClient,
        config: {
            tags: ['api'],
            description: 'Create new Client',
            notes: 'Cria um novo Cliente',
            validate: {
                payload: Joi.object({
                    nome: Joi.string(),
                    email: Joi.string()
                })
            }    
        }
    },
    {
        method: 'POST',
        path: `${baseRoute}/{id}/favorite`,
        config: { auth: 'jwt' },
        handler: ClientController.addFavorite,
        config: {
            tags: ['api'],
            description: 'Add Favorite To Client',
            notes: 'Adiciona na lista de favoritos do Cliente',    
        }
    },
    {
        method: 'PUT',
        path: `${baseRoute}/{id}`,
        config: { auth: 'jwt' },
        handler: ClientController.updateClient,
        config: {
            tags: ['api'],
            description: 'Update a Client',
            notes: 'Atualiza Cliente Existente',    
        }
    },
    {
        method: 'DELETE',
        path: `${baseRoute}/{id}/favorite`,
        config: { auth: 'jwt' },
        handler: ClientController.removeFavorite,
        config: {
            tags: ['api'],
            description: 'Remove Favorite To Client',
            notes: 'Remove da lista de favoritos do Cliente',    
        }
    },
    {
        method: 'DELETE',
        path: `${baseRoute}/{id}`,
        config: { auth: 'jwt' },
        handler: ClientController.deleteClient,
        config: {
            tags: ['api'],
            description: 'Remove Client',
            notes: 'Remove completamente um Cliente',    
        }
    }
]
module.exports = routes
const User = require(`../Model/User`)
const JWT = require('../../../lib/jwt')

module.exports = {
    findUser: (request, h) => {
        try {
            var user = User.find(p => p.name === request.payload.name && p.password === request.payload.password);
            if(!user) {
                return h.response({message: "User não encontrado"});
            }
            return h.response({message: "Login efetuado", token: JWT.createToken(user)});
        } catch (error) {
            return h.response(error).code(500);
        }
    },

    validate: (request, payload, h) => {
        let user = User.find(p => p.id === payload.id);
        if (!user) {
            return { credentials: null, isValid: false };
        }

        return {
            isValid: true,
            credentials: { id: user.id, name: user.name }
        }
    },
}
'use strict';

const jwt = require('jsonwebtoken');

module.exports = {

    secret: process.env.AUTH_KEY,
    
    createToken: (people) => {
        return jwt.sign({
            id: people.id,
            username: people.username,
            scopes: people.scope
        }, process.env.AUTH_KEY,
        {
            algorithm: 'HS256',
            expiresIn: '1y'
        });
    }
}

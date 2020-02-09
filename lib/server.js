const Hapi = require('@hapi/hapi');
const plugins = require('../plugins');
const JWT = require(`./jwt`)
const dotenv = require('dotenv')
const UserController = require('../server/User/Controller/UserController')

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

exports.init = async () => {

    await server.register(plugins);
    await server.initialize();
    return server;
};

exports.start = async () => {
    const myEnv = dotenv.config()
    await server.register(require('hapi-jsonwebtoken').plugin);
    server.auth.strategy('jwt', 'hapi-jsonwebtoken', {
        secretOrPrivateKey: myEnv.parsed.AUTH_KEY,
        validate: UserController.validate
    });
    await server.register(plugins);
    await server.start();
    server.auth.default('jwt');

    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});
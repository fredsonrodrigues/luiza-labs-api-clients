const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const plugins = require('../plugins');
const JWT = require(`./jwt`)
const dotenv = require('dotenv')
const UserController = require('../server/User/Controller/UserController')
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const swaggerOptions = {
    info: {
        title: 'Test Luiza Labs API',
        version: Pack.version,
    },
    securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    security: [{ Bearer: [] }]
};

exports.init = async () => {
    const myEnv = dotenv.config()
    await server.register(require('hapi-jsonwebtoken').plugin);
    server.auth.strategy('jwt', 'hapi-jsonwebtoken', {
        secretOrPrivateKey: myEnv.parsed.AUTH_KEY,
        validate: UserController.validate
    });
    await server.register(plugins);
    await server.initialize();
    server.auth.default('jwt');
    return server;
};

exports.start = async () => {
    const myEnv = dotenv.config()
    await server.register(require('hapi-jsonwebtoken').plugin)
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
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
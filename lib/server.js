const Hapi = require('@hapi/hapi');
const plugins = require('../plugins');

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
    
    await server.register(plugins);
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});
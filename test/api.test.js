'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { after, before, describe, it } = exports.lab = Lab.script();
const { init } = require('../lib/server');

describe('GET /', () => {
    let server;

    before(async () => {
        server = await init();
    });

    after(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('responds /Clients GET with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/clients'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('responds /Clients POST with 200', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/clients'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('responds /Clients PUT with 200', async () => {
        const res = await server.inject({
            method: 'put',
            url: '/clients/1'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('responds /Clients DELETE with 200', async () => {
        const res = await server.inject({
            method: 'delete',
            url: '/clients/1'
        });
        expect(res.statusCode).to.equal(200);
    });
});
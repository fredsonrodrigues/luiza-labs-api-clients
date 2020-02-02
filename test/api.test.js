'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { after, before, describe, it } = exports.lab = Lab.script();
const { init } = require('../lib/server');
const Client = require('../server/Clients/Model/Client');

describe('GET /', () => {
    let server;
    let test = {
        _id: 0
    }

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

    it('responds /Clients POST with 200', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/clients',
            payload: {
                name: 'Marcus Tester',
                email: 'tester@teste.com'
            }
        });
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(res.payload)).to.be.an.instanceof(Object);
        test = JSON.parse(res.payload)
    });

    it('responds /Clients GET with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/clients'
        });
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(res.payload)).to.be.an.instanceof(Array);
    });

    it('responds /Clients PUT with 200', async () => {
        const res = await server.inject({
            method: 'put',
            url: `/clients/${test._id}`,
            payload: {
                ...test,
                name: 'Teste teste'
            }
        });
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(res.payload)).to.be.an.instanceof(Object);
    });

    it('responds /Clients DELETE with 200', async () => {
        const res = await server.inject({
            method: 'delete',
            url: `/clients/${test._id}`
        });
        expect(JSON.parse(res.payload)).to.be.an.instanceof(Object);
        expect(res.statusCode).to.equal(200);
    });
});
'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { after, before, describe, it } = exports.lab = Lab.script();
const { init } = require('../lib/server');
const User = require('../server/User/Model/User');

describe('GET /Clients', () => {
    let server;
    let token;
    let user = User[0]
    let test = {
        _id: 0
    }

    before(async () => {
        server = await init();
    });

    after(async () => {
        await server.stop();
    });

    it('responds /Auth/Login POST with 200', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/auth/login',
            payload: user
        });
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(res.payload)).to.be.an.instanceof(Object);
        token = JSON.parse(res.payload).token
    });    

    it('responds /Clients POST with 200', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/clients',
            headers: {
                authorization: `Bearer ${token}`
            },
            payload: {
                name: `Tester ${new Date().getTime()}`,
                email: `${new Date().getTime()}@tester.com`
            }
        });
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(res.payload)).to.be.an.instanceof(Object);
        test = JSON.parse(res.payload)
    });

    it('responds /Clients/{id}/favorites POST with 200', async () => {
        const res = await server.inject({
            method: 'post',
            url: `/clients/${test._id}/favorite`,
            headers: {
                authorization: `Bearer ${token}`
            },
            payload: { favorite_id: "e9a72482-7e95-44ff-ea5a-75147aef2184" }
        });
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(res.payload)).to.be.an.instanceof(Object);
        test = JSON.parse(res.payload)
    });

    it('responds /Clients GET with 200', async () => {
        const res = await server.inject({
            method: 'get',
            headers: {
                authorization: `Bearer ${token}`
            },
            url: '/clients'
        });
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(res.payload)).to.be.an.instanceof(Array);
    });

    it('responds /Clients PUT with 200', async () => {
        const res = await server.inject({
            method: 'put',
            url: `/clients/${test._id}`,
            headers: {
                authorization: `Bearer ${token}`
            },
            payload: {
                ...test,
                name: 'Teste teste'
            }
        });
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(res.payload)).to.be.an.instanceof(Object);
    });

    
    it('responds /Clients/{id}/favorites DELETE with 200', async () => {
        const res = await server.inject({
            method: 'delete',
            url: `/clients/${test._id}/favorite`,
            headers: {
                authorization: `Bearer ${token}`
            },
            payload: { favorite_id: "e9a72482-7e95-44ff-ea5a-75147aef2184" }
        });
        expect(JSON.parse(res.payload)).to.be.an.instanceof(Object);
        expect(res.statusCode).to.equal(200);
    });

    it('responds /Clients DELETE with 200', async () => {
        const res = await server.inject({
            method: 'delete',
            headers: {
                authorization: `Bearer ${token}`
            },
            url: `/clients/${test._id}`
        });
        expect(JSON.parse(res.payload)).to.be.an.instanceof(Object);
        expect(res.statusCode).to.equal(200);
    });
});
'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { app, runServer, closeServer } = require('../server');
const { User } = require('../users');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');
const expect = chai.expect;

chai.use(chaiHttp);


describe('Rsvp endpoints', function () {
    const username = 'Michaels';
    const password = 'a1234123412';
    const firstName = 'bob';
    const lastName = 'sagat';
    const email = 'mikemail@mike.com';
    const imgUrl = '"https://dummyimage.com/200x200/000/fff';
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    after(function () {
        return closeServer();
    });
    let token;
    beforeEach(function () {
        return chai
            .request(app)
            .post('/users/register')
            .send({ username, password, firstName, lastName, email, imgUrl })
            .then(res => {
            })
            .then(() => {
                return chai
                    .request(app)
                    .post('/auth/login')
                    .send({ username, password })
                    .then(resp => token = JSON.parse(resp.text).authToken)
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    });

    afterEach(function () {
        return User.remove({});
    });

    describe('/rsvp/posts', function () {

        it('Should accept post requests with credentials', function () {

            return chai
                .request(app)
                .post('/rsvp')
                .set('Authorization', `Bearer ${token}`)
                .send({ eventId: '5c755fe04e0c561afc57e900' })
                .then(res => {
                    expect(JSON.parse(res.text).eventId).to.equal('5c755fe04e0c561afc57e900');
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect.fail(null, null, 'Request should return unauthorized')
                });
        });

        it('Should deny post requests with bad event ID credentials', function () {

            return chai
                .request(app)
                .post('/rsvp')
                .set('Authorization', `Bearer ${token}`)
                .send({ eventId: '5c757e900' })
                .then(res => {
                    expect(res).to.have.status(400);
                    // expect.fail(null, null, 'Request should return unauthorized');
                    // expect.fail(null, null, 'Request should not succeed')
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect.fail(err);
                });

        });
    });
    describe('/rsvp', function () {

        it('Should accept requests with credentials', function () {

            return chai
                .request(app)
                .get('/rsvp/all')
                .set('authorization', `Bearer ${token}`)
                .then(res => {
                    console.log(Object.keys(JSON.parse(res.text)[0]));
                    expect(Object.keys(JSON.parse(res.text)[0])[0]).to.equal('userId');
                    expect(Object.keys(JSON.parse(res.text)[0])[1]).to.equal('rsvp');
                    expect(Object.keys(JSON.parse(res.text)[0])[2]).to.equal('eventId');
                    expect(Object.keys(JSON.parse(res.text)[0])[3]).to.equal('createdAt');
                    expect(Object.keys(JSON.parse(res.text)[0])[4]).to.equal('updatedAt');
                    expect(Object.keys(JSON.parse(res.text)[0])[5]).to.equal('id');
                    // expect.fail(null, null, 'Request should not succeed')
                })
                .catch(err => {
                    console.log(err)
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                    const res = err.response;
                    expect.fail(null, null, 'Request should return unauthorized')
                });
        });

        it('Should reject requests with no credentials', function () {
            return chai
                .request(app)
                .get('/rsvp/all')
                .then(res => {
                    expect(res.text).to.equal('Unauthorized');
                    // expect.fail(null, null, 'Request should not succeed')
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect.fail(null, null, 'Request should return unauthorized')
                });
        });

        it('Should reject requests with an invalid token', function () {

            return chai
                .request(app)
                .get('/rsvp/all')
                .set('Authorization', `Bearer mocha`)
                .then(res =>
                    expect(res.text).to.equal('Unauthorized')
                )
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                    const res = err.response;
                    expect.fail(null, null, 'Request should return unauthorized')
                });
        });
    });
});
'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { app, runServer, closeServer } = require('../server');
const { User } = require('../users');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');
const expect = chai.expect;

chai.use(chaiHttp);


describe('Rsvp meetup endpoints', function () {
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

    describe('/rsvpmeetups', function () {

        it('Should return all rsvp meetups', function () {
            return chai
                .request(app)
                .get('/rsvpmeetup/all')
                .set('Authorization', `Bearer ${token}`)
                .then(res => {
                    expect(res).to.have.status(200);
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                    const res = err.response;
                    expect.fail(null, null, 'Request should not succeed');
                });
        })

        it('Should fail to return all rsvp meetups due to bad user token', function () {
            return chai
                .request(app)
                .get('/rsvpmeetup/all')
                .set('Authorization', `Bearer mocha`)
                .then(res => {
                    expect(res).to.have.status(401);
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                    const res = err.response;
                    expect(JSON.parse(res.text).eventId).to.equal('5c755fe04e0c561afc57e900');
                });
        })

        it('Should return one rsvp meetup', function () {
            return chai
                .request(app)
                .get('/rsvpmeetup/user')
                .set('Authorization', `Bearer ${token}`)
                .then(res => {
                    expect(res).to.be.equal(res);
                    expect(res).to.have.status(200);
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                    const res = err.response;
                    expect.fail(err);
                });
        })

        it('Should post one rsvp meetup', function () {
            return chai
                .request(app)
                .post('/rsvpmeetup')
                .set('Authorization', `Bearer ${token}`)
                .send({ eventId: '5c755fe04e0c561afc57e900' })
                .then(res => {
                    expect(res).to.have.status(200);
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                    const res = err.response;
                    expect.fail(err);
                });
        })

        it('Should fail to post one rsvp meetup due to wrong information in the body', function () {

        })

        it('Should delete one rsvp meetup', function () {

        })

    });

});
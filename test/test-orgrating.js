'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { app, runServer, closeServer } = require('../server');
const { User } = require('../users');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');
const expect = chai.expect;

chai.use(chaiHttp);


describe('Org rating endpoints', function () {
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

    describe('/orgrating', function () {

        it('Should attempt to return all ratings', function () {
            return chai
                .request(app)
                .get('/orgrating')
                .set('Authorization', `Bearer ${token}`)
                .then(res => {
                    console.log(JSON.stringify(res, null, 2));
                    expect(JSON.parse(res.status)).to.equal(200);
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect.fail(null, null, 'Request should return ratings')
                });
        });

        it('Should fail to return due to token issue', function () {
            return chai
                .request(app)
                .get('/orgrating')
                .set('Authorization', `Bearer bad bad token`)
                .then(res => {
                    console.log(JSON.stringify(res, null, 2));
                    expect(JSON.parse(res.status)).to.equal(401);
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect.fail(null, null, 'Request should return unauthorized')
                });
        });

        it('Should attempt to return a single event via org id', function () {
            return chai
                .request(app)
                .get('/orgrating/org/5c755fe04e1c561afc57e900')
                .set('Authorization', `Bearer ${token}`)
                .then(res => {
                    console.log(JSON.stringify(res, null, 2));
                    expect(JSON.parse(res.status)).to.equal(200);
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect.fail(null, null, 'Request should return single event')
                });
        });


        it('Should attempt to return all ratings for a user', function () {

            return chai
                .request(app)
                .get('/orgrating/user/all')
                .set('Authorization', `Bearer ${token}`)
                .then(res => {
                    console.log(JSON.stringify(res, null, 2));
                    expect(JSON.parse(res.status)).to.equal(200);
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect.fail(null, null, 'Request should return a single endpoint owned by the user')
                });
        });

        it('Should attempt to return post a single rating', function () {

            return chai
                .request(app)
                .post('/orgrating')
                .set('Authorization', `Bearer ${token}`)
                .send({ rating: 5, orgId: '5c755fe04e0c561afc57e900' })
                .then(res => {
                    console.log(JSON.stringify(res, null, 2));
                    expect(JSON.parse(res.status)).to.equal(200);
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                    const res = err.response;
                    expect.fail(null, null, 'Request should return a single endpoint owned by the user')
                });
        });

        it('Should attempt to delete one rating but fail becuase it doesnt exist', function () {
            return chai
                .request(app)
                .delete('/orgrating')
                .set('Authorization', `Bearer ${token}`)
                .send({ orgId: '5c755fe04e0c561afc57e900' })
                .then(res => {
                    console.log(JSON.stringify(res, null, 2));
                    expect(JSON.parse(res.status)).to.equal(200);
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                    const res = err.response;
                    expect.fail(null, null, 'Request should return a single endpoint owned by the user')
                });
        });

    });

});
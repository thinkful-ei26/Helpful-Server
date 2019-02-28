'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { app, runServer, closeServer } = require('../server');
const { User } = require('../users');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');
const expect = chai.expect;

chai.use(chaiHttp);


describe('Floowing endpoints', function () {
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

    describe('/following', function () {

        it('Should attempt to return all following', function () {
            return chai
                .request(app)
                .get('/follow/all')
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
                    expect.fail(null, null, 'Request should return following')
                });
        });

        it('Should fail to return all followings', function () {
            return chai
                .request(app)
                .get('/follow/all')
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
                    expect.fail(null, null, 'Request should fail to return')
                });
        });

        it('Should return a single orgs followings', function () {
            return chai
                .request(app)
                .get('/follow/org/5c755fe04e1c561afc57e900')
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
                    expect.fail(null, null, 'Request should fail to return')
                });
        });

        it('Should attempt to post a follow and fail', function () {
            return chai
                .request(app)
                .post('/follow')
                .set('Authorization', `Bearer ${token}`)
                .send({ orgId: '5c7577168a142531d5829' })
                .then(res => {
                    console.log(JSON.stringify(res, null, 2));
                    expect(JSON.parse(res.status)).to.equal(400);
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect.fail(null, null, 'Request should return 400 status')
                });
        });

        it('Should attempt to post a follow', function () {
            return chai
                .request(app)
                .post('/follow')
                .set('Authorization', `Bearer ${token}`)
                .send({ orgId: '5c7577168a142531d5c6c829' })
                .then(res => {
                    console.log(JSON.stringify(res, null, 2));
                    expect(JSON.parse(res.status)).to.equal(200);
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect.fail(null, null, 'Request should return posted follows')
                });
        });

        it('Should attempt to delete a single following', function () {
            return chai
                .request(app)
                .delete('/follow')
                .set('Authorization', `Bearer ${token}`)
                .send({ followId: '5c715fe04e1c661afc57e311' })
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
    });
});
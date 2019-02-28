'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { app, runServer, closeServer } = require('../server');
const { User } = require('../users');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');
const expect = chai.expect;

chai.use(chaiHttp);


describe('Event rating endpoints', function () {
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
                .get('/eventrating')
                .set('Authorization', `Bearer ${token}`)
                .then(res => {
                    console.log(JSON.stringify(res, null, 2));
                    expect(JSON.parse(res.status)).to.equal(404);
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
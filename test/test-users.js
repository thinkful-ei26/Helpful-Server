"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require("../server");
const { User } = require("../users");
const { TEST_DATABASE_URL } = require("../config");

// const expect = chai.expect;

// // This let's us make HTTP requests
// // in our tests.
// // see: https://github.com/chaijs/chai-http
// chai.use(chaiHttp);

describe("/user", function() {
    const username = "exampleUser";
    const password = "examplePass";
    const firstName = "Example";
    const lastName = "User";
    const email = "email@email.com";
    const imgUrl = "http://iamimage.com";
    const usernameB = "exampleUserB";
    const passwordB = "examplePassB";
    const firstNameB = "ExampleB";
    const lastNameB = "UserB";
    const emailB = "emailB@email.com";
    const imgUrlB = "http://iamimageb.com";

    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    after(function() {
        return closeServer();
    });

    beforeEach(function() {});

    afterEach(function() {
        return User.remove({});
    });

    describe("/users", function() {
        describe("POST", function() {
            it("Should reject users with missing username", function() {
                return chai
                    .request(app)
                    .post("/users/register")
                    .send({
                        password,
                        firstName,
                        lastName,
                        email,
                        imgUrl,
                    })
                    .then(res => expect.fail(res))
                    .catch(err => {
                        const parsedErr = JSON.parse(err.message.text);
                        expect(parsedErr.code).to.equal(422);
                        expect(parsedErr.reason).to.equal("ValidationError");
                        expect(parsedErr.message).to.equal("Missing field");
                        expect(parsedErr.location).to.equal("username");
                    });
            });
            it("Should reject users with missing password", function() {
                return chai
                    .request(app)
                    .post("/users/register")
                    .send({
                        username,
                        firstName,
                        lastName,
                        email,
                        imgUrl,
                    })
                    .then(res => expect.fail(res))
                    .catch(err => {
                        const parsedErr = JSON.parse(err.message.text);
                        expect(parsedErr.code).to.equal(422);
                        expect(parsedErr.reason).to.equal("ValidationError");
                        expect(parsedErr.message).to.equal("Missing field");
                        expect(parsedErr.location).to.equal("password");
                    });
            });
            it("Should reject users with non-string username", function() {
                return chai
                    .request(app)
                    .post("/users/register")
                    .send({
                        username: 1234,
                        password,
                        firstName,
                        lastName,
                    })
                    .then(res => expect.fail(res))
                    .catch(err => {
                        const parsedErr = JSON.parse(err.message.text);
                        expect(parsedErr.code).to.equal(422);
                        expect(parsedErr.reason).to.equal("ValidationError");
                        expect(parsedErr.message).to.equal(
                            "Incorrect field type: expected string"
                        );
                        expect(parsedErr.location).to.equal("username");
                    });
            });
            it("Should reject users with non-string password", function() {
                return chai
                    .request(app)
                    .post("/users/register")
                    .send({
                        username,
                        password: 1234,
                        firstName,
                        lastName,
                    })
                    .then(res => expect.fail(res))
                    .catch(err => {
                        const parsedErr = JSON.parse(err.message.text);
                        expect(parsedErr.code).to.equal(422);
                        expect(parsedErr.reason).to.equal("ValidationError");
                        expect(parsedErr.message).to.equal(
                            "Incorrect field type: expected string"
                        );
                        expect(parsedErr.location).to.equal("password");
                    });
            });
            it("Should reject users with non-string first name", function() {
                return chai
                    .request(app)
                    .post("/users/register")
                    .send({
                        username,
                        password,
                        firstName: 1234,
                        lastName,
                    })
                    .then(res => expect.fail(res))
                    .catch(err => {
                        const parsedErr = JSON.parse(err.message.text);
                        expect(parsedErr.code).to.equal(422);
                        expect(parsedErr.reason).to.equal("ValidationError");
                        expect(parsedErr.message).to.equal(
                            "Incorrect field type: expected string"
                        );
                        expect(parsedErr.location).to.equal("firstName");
                    });
            });
            it("Should reject users with non-string last name", function() {
                return chai
                    .request(app)
                    .post("/users/register")
                    .send({
                        username,
                        password,
                        firstName,
                        lastName: 1234,
                    })
                    .then(res => expect.fail(res))
                    .catch(err => {
                        const parsedErr = JSON.parse(err.message.text);
                        expect(parsedErr.code).to.equal(422);
                        expect(parsedErr.reason).to.equal("ValidationError");
                        expect(parsedErr.message).to.equal(
                            "Incorrect field type: expected string"
                        );
                        expect(parsedErr.location).to.equal("lastName");
                    });
            });
            it("Should reject users with non-trimmed username", function() {
                return chai
                    .request(app)
                    .post("/users/register")
                    .send({
                        username: ` ${username} `,
                        password,
                        firstName,
                        lastName,
                    })
                    .then(res => expect.fail(res))
                    .catch(err => {
                        const parsedErr = JSON.parse(err.message.text);
                        expect(parsedErr.code).to.equal(422);
                        expect(parsedErr.reason).to.equal("ValidationError");
                        expect(parsedErr.message).to.equal(
                            "Cannot start or end with whitespace"
                        );
                        expect(parsedErr.location).to.equal("username");
                    });
            });
            it("Should reject users with non-trimmed password", function() {
                return chai
                    .request(app)
                    .post("/users/register")
                    .send({
                        username,
                        password: ` ${password} `,
                        firstName,
                        lastName,
                    })
                    .then(res => expect.fail(res))
                    .catch(err => {
                        const parsedErr = JSON.parse(err.message.text);
                        expect(parsedErr.code).to.equal(422);
                        expect(parsedErr.reason).to.equal("ValidationError");
                        expect(parsedErr.message).to.equal(
                            "Cannot start or end with whitespace"
                        );
                        expect(parsedErr.location).to.equal("password");
                    });
            });
            it("Should reject users with empty username", function() {
                return chai
                    .request(app)
                    .post("/users/register")
                    .send({
                        username: "",
                        password,
                        firstName,
                        lastName,
                    })
                    .then(res => expect.fail(res))
                    .catch(err => {
                        const parsedErr = JSON.parse(err.message.text);
                        expect(parsedErr.code).to.equal(422);
                        expect(parsedErr.reason).to.equal("ValidationError");
                        expect(parsedErr.message).to.equal(
                            "Must be at least 1 characters long"
                        );
                        expect(parsedErr.location).to.equal("username");
                    });
            });
            it("Should reject users with password less than ten characters", function() {
                return chai
                    .request(app)
                    .post("/users/register")
                    .send({
                        username,
                        password: "123456789",
                        firstName,
                        lastName,
                    })
                    .then(res => expect.fail(res))
                    .catch(err => {
                        const parsedErr = JSON.parse(err.message.text);
                        expect(parsedErr.code).to.equal(422);
                        expect(parsedErr.reason).to.equal("ValidationError");
                        expect(parsedErr.message).to.equal(
                            "Must be at least 10 characters long"
                        );
                        expect(parsedErr.location).to.equal("password");
                    });
            });
            it("Should reject users with password greater than 72 characters", function() {
                return chai
                    .request(app)
                    .post("/users/register")
                    .send({
                        username,
                        password: new Array(73).fill("a").join(""),
                        firstName,
                        lastName,
                    })
                    .then(res => expect.fail(res))
                    .catch(err => {
                        const parsedErr = JSON.parse(err.message.text);
                        expect(parsedErr.code).to.equal(422);
                        expect(parsedErr.reason).to.equal("ValidationError");
                        expect(parsedErr.message).to.equal(
                            "Must be at most 72 characters long"
                        );
                        expect(parsedErr.location).to.equal("password");
                    });
            });
            it("Should reject users with duplicate username", function() {
                // Create an initial user
                return User.create({
                    username,
                    password,
                    firstName,
                    lastName,
                    email,
                    imgUrl,
                })
                    .then(() =>
                        // Try to create a second user with the same username
                        chai
                            .request(app)
                            .post("/users/register")
                            .send({
                                username,
                                password,
                                firstName,
                                lastName,
                                email,
                                imgUrl,
                            })
                    )
                    .then(res => expect.fail(res))
                    .catch(err => {
                        const parsedErr = JSON.parse(err.message.text);
                        expect(parsedErr.code).to.equal(422);
                        expect(parsedErr.reason).to.equal("ValidationError");
                        expect(parsedErr.message).to.equal(
                            "Username already taken"
                        );
                        expect(parsedErr.location).to.equal("username");
                    });
            });
            it("Should create a new user", function() {
                return chai
                    .request(app)
                    .post("/users/register")
                    .send({
                        username,
                        password,
                        firstName,
                        lastName,
                        email,
                        imgUrl,
                    })
                    .then(res => {
                        let parsedRes = JSON.parse(res.text);
                        expect(res).to.have.status(201);
                        expect(parsedRes).to.be.an("object");
                        expect(parsedRes).to.have.keys(
                            "username",
                            "firstName",
                            "lastName",
                            "id",
                            "email",
                            "imgUrl"
                        );
                        expect(parsedRes.username).to.equal(username);
                        expect(parsedRes.firstName).to.equal(firstName);
                        expect(parsedRes.lastName).to.equal(lastName);
                        expect(parsedRes.email).to.equal(email);
                        expect(parsedRes.imgUrl).to.equal(imgUrl);
                        return User.findOne({
                            username,
                        });
                    })
                    .then(user => {
                        expect(user).to.not.be.null;
                        expect(user.firstName).to.equal(firstName);
                        expect(user.lastName).to.equal(lastName);
                        expect(user.email).to.equal(email);
                        expect(user.imgUrl).to.equal(imgUrl);
                        return user.validatePassword(password);
                    })
                    .then(passwordIsCorrect => {
                        expect(passwordIsCorrect).to.be.true;
                    });
            });
            it("Should trim firstName and lastName", function() {
                return chai
                    .request(app)
                    .post("/users/register")
                    .send({
                        username,
                        password,
                        firstName,
                        lastName,
                        email,
                        imgUrl,
                    })
                    .then(res => {
                        let parsedRes = JSON.parse(res.text);
                        expect(res).to.have.status(201);
                        expect(parsedRes).to.be.an("object");
                        expect(parsedRes).to.have.keys(
                            "username",
                            "firstName",
                            "lastName",
                            "id",
                            "email",
                            "imgUrl"
                        );
                        expect(parsedRes.username).to.equal(username);
                        expect(parsedRes.firstName).to.equal(firstName);
                        expect(parsedRes.lastName).to.equal(lastName);
                        expect(parsedRes.email).to.equal(email);
                        expect(parsedRes.imgUrl).to.equal(imgUrl);
                        return User.findOne({
                            username,
                        });
                    })
                    .then(user => {
                        expect(user).to.not.be.null;
                        expect(user.firstName).to.equal(firstName);
                        expect(user.lastName).to.equal(lastName);
                        expect(user.email).to.equal(email);
                        expect(user.imgUrl).to.equal(imgUrl);
                        return user.validatePassword(password);
                    });
            });
        });
    });

    describe("GET", function() {
        it("Should return an empty array initially", function() {
            return chai
                .request(app)
                .get("/users/")
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    expect(res.body).to.have.length(0);
                });
        });
        it("Should return an array of users", function() {
            return User.create(
                {
                    username,
                    password,
                    firstName,
                    lastName,
                    email,
                    imgUrl,
                },
                {
                    username: usernameB,
                    password: passwordB,
                    firstName: firstNameB,
                    lastName: lastNameB,
                    email: emailB,
                    imgUrl: imgUrlB,
                }
            )
                .then(() => chai.request(app).get("/users"))
                .then(res => {
                    let id;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    expect(res.body).to.have.length(2);
                    expect(res.body[0]).to.have.keys({
                        username,
                        firstName,
                        lastName,
                        email,
                        imgUrl,
                        id,
                    });
                    expect(res.body[1]).to.have.keys({
                        username: usernameB,
                        firstName: firstNameB,
                        lastName: lastNameB,
                        email: emailB,
                        imgUrl: imgUrlB,
                        id,
                    });
                });
        });
    });
});

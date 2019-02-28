// "use strict";

// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const jwt = require("jsonwebtoken");

// const { app, runServer, closeServer } = require("../server");
// const { User } = require("../users");
// const { JWT_SECRET, TEST_DATABASE_URL } = require("../config");

// const expect = chai.expect;

// // This let's us make HTTP requests
// // in our tests.
// // see: https://github.com/chaijs/chai-http
// chai.use(chaiHttp);

// describe("Auth endpoints", function() {
//     const username = "exampleUser";
//     const password = "examplePass";
//     const imgUrl = "http://example.url";
//     const email = "example@email.com";

//     before(function() {
//         return runServer(TEST_DATABASE_URL);
//     });

//     after(function() {
//         return closeServer();
//     });

//     beforeEach(function() {
//         return User.hashPassword(password).then(password =>
//             User.create({
//                 username,
//                 password,
//                 imgUrl,
//                 email,
//             })
//         );
//     });

//     afterEach(function() {
//         return User.remove({});
//     });

//     describe("/auth/login", function() {
//         it("Should reject requests with no credentials", function() {
//             return chai
//                 .request(app)
//                 .post("/auth/login")
//                 .then(res => {
//                     console.log("i am res", res);
//                     expect.fail(res);
//                 })
//                 .catch(err => {
//                     console.log("i am err", err);
//                     expect(err.message).to.have.status(401);
//                     expect(err.message.body.message).to.equal(
//                         "Incorrect Form Body"
//                     );
//                 });
//         });
//         it("Should reject requests with incorrect usernames or passwords", function() {
//             return chai
//                 .request(app)
//                 .post("/auth/login")
//                 .send({ username: "wrongUsername", password: "wrongPassword" })
//                 .then(res => {
//                     expect.fail(res);
//                 })
//                 .catch(err => {
//                     let parsedErr = JSON.parse(err.message.text);
//                     expect(err.message).to.have.status(200);
//                     expect(parsedErr.reason).to.equal("LoginError");
//                     expect(parsedErr.message).to.equal(
//                         "Incorrect username or password"
//                     );
//                 });
//         });
//         it("Should return a valid auth token", function() {
//             return chai
//                 .request(app)
//                 .post("/auth/login")
//                 .send({ username, password })
//                 .then(res => {
//                     expect(res).to.have.status(200);
//                     expect(res.body).to.be.an("object");
//                     const token = res.body.authToken;
//                     expect(token).to.be.a("string");
//                     const payload = jwt.verify(token, JWT_SECRET, {
//                         algorithm: ["HS256"],
//                     });
//                     expect(payload.user).to.deep.equal({
//                         username,
//                         imgUrl,
//                         email,
//                         firstName: "",
//                         lastName: "",
//                         id: payload.user.id,
//                     });
//                 });
//         });
//     });

//     describe("/auth/refresh", function() {
//         it("Should reject requests with no credentials", function() {
//             return chai
//                 .request(app)
//                 .post("/auth/refresh")
//                 .then(res => expect.fail(res))
//                 .catch(err => {
//                     // console.log(JSON.stringify(err, null, 2));
//                     expect(err.message).to.have.status(401);
//                     expect(err.message.text).to.equal("Unauthorized");
//                 });
//         });
//         it("Should reject requests with an invalid token", function() {
//             const token = jwt.sign(
//                 {
//                     username,
//                 },
//                 "wrongSecret",
//                 {
//                     algorithm: "HS256",
//                     expiresIn: "7d",
//                 }
//             );

//             return chai
//                 .request(app)
//                 .post("/auth/refresh")
//                 .set("Authorization", `Bearer ${token}`)
//                 .then(res => expect.fail(res))
//                 .catch(err => {
//                     expect(err.message).to.have.status(401);
//                 });
//         });
//         it("Should reject requests with an expired token", function() {
//             const token = jwt.sign(
//                 {
//                     user: {
//                         username,
//                     },
//                 },
//                 JWT_SECRET,
//                 {
//                     algorithm: "HS256",
//                     subject: username,
//                     expiresIn: Math.floor(Date.now() / 1000) - 10, // Expired ten seconds ago
//                 }
//             );

//             return chai
//                 .request(app)
//                 .post("/auth/refresh")
//                 .set("authorization", `Bearer ${token}`)
//                 .then(res => expect.fail(res))
//                 .catch(err => {
//                     expect(err.message).to.have.status(200);
//                 });
//         });
//         it("Should return a valid auth token with a newer expiry date", function() {
//             const token = jwt.sign(
//                 {
//                     user: {
//                         username,
//                     },
//                 },
//                 JWT_SECRET,
//                 {
//                     algorithm: "HS256",
//                     subject: username,
//                     expiresIn: "7d",
//                 }
//             );
//             const decoded = jwt.decode(token);

//             return chai
//                 .request(app)
//                 .post("/auth/refresh")
//                 .set("authorization", `Bearer ${token}`)
//                 .then(res => {
//                     expect(res).to.have.status(200);
//                     expect(res.body).to.be.an("object");
//                     const token = res.body.authToken;
//                     expect(token).to.be.a("string");
//                     const payload = jwt.verify(token, JWT_SECRET, {
//                         algorithm: ["HS256"],
//                     });
//                     expect(payload.user).to.deep.equal({
//                         username,
//                     });
//                     expect(payload.exp).to.be.at.least(decoded.exp);
//                 });
//         });
//     });
// });

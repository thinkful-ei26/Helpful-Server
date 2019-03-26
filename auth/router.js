"use strict";
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const config = require("../config");
const router = express.Router();

const createAuthToken = function(user) {
    return jwt.sign({ user }, config.JWT_SECRET, {
        subject: user.username,
        expiresIn: config.JWT_EXPIRY,
        algorithm: "HS256",
    });
};

const localAuth = passport.authenticate("local", {
    session: false,
    failureFlash: true,
});
router.use(bodyParser.json());
// The user provides a username and password to login
router.post("/login", function(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
        if (err) {
            return res.json(err);
        }
        // if (!user) {
        //     console.log("*words*", user);
        // }
        // console.log("error report line 26", err);
        if (user.username) {
            const authToken = createAuthToken(user.serialize());
            res.json({ authToken });
        } else {
            res.status(401).json({ message: "Incorrect Username or Password" });
        }
    })(req, res, next);
});

const jwtAuth = passport.authenticate("jwt", { session: false });

// The user exchanges a valid JWT for a new one with a later expiration
router.post("/refresh", jwtAuth, (req, res) => {
    const authToken = createAuthToken(req.user);
    res.json({ authToken });
});

module.exports = { router };

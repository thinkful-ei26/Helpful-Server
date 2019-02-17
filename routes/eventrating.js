const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Eventrating = require("../models/eventrating");

const router = express.Router();

/* JWT Auth */

const jwtAuth = passport.authenticate('jwt', { session: false });

/* Get all  */

router.get('/', jwtAuth, (req, res, next) => {
    Eventrating.find()
        .sort({ createdAt: "desc" })
        .then(ratings => {
            res.json(ratings);
        })
        .catch(err => {
            next(err);
        });
})

/* Get all per ratings an event  */

router.get('/event', jwtAuth, (req, res, next) => {
    const eventId = req.body;
    Eventrating.find({ eventId })
        .sort({ createdAt: "desc" })
        .then(ratings => {
            res.json(ratings);
        })
        .catch(err => {
            next(err);
        });
})

/* Get a specific rating via userid and event id  */

router.get('/user', jwtAuth, (req, res, next) => {
    const eventId = req.body;
    const userId = req.user.id;
    Eventrating.find({ userId, eventId })
        .sort({ createdAt: "desc" })
        .then(ratings => {
            res.json(ratings);
        })
        .catch(err => {
            next(err);
        });
})

/* Get all ratings from a user */

router.get('/user/all', jwtAuth, (req, res, next) => {
    const userId = req.user.id;
    Eventrating.find({ userId })
        .sort({ createdAt: "desc" })
        .then(ratings => {
            res.json(ratings);
        })
        .catch(err => {
            next(err);
        });
})

/* Post New Event Endpoint  */

router.post("/", jwtAuth, (req, res, next) => {

    const userId = req.user.id;

    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        const err = new Error("The `id` is not valid");
        err.status = 400;
        return next(err);
    }
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        const err = new Error("The `id` is not valid");
        err.status = 400;
        return next(err);
    }
    if (!rating) {
        const err = new Error("The `rating` is not valid");
        err.status = 400;
        return next(err);
    }
    if (!description) {
        const err = new Error("The `description` is not valid");
        err.status = 400;
        return next(err);
    }
    /*            */

    const newRating = { userId, rating, description, eventId };
    Eventrating.create(newRating)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            next(err);
        });
});


router.put("/", jwtAuth, (req, res, next) => {
    let { rating, description, eventId } = req.body;
    const userId = req.user.id;
    let eventrating = {};
    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        const err = new Error("The `id` is not valid");
        err.status = 400;
        return next(err);
    }
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        const err = new Error("The `id` is not valid");
        err.status = 400;
        return next(err);
    }
    if (rating) {
        if (typeof rating !== String) {
            const err = new Error("The `rating` is not valid");
            err.status = 400;
            return next(err);
        } else {
            eventrating.rating = rating;
        }
    }
    if (description) {
        if (typeof description !== String) {
            const err = new Error("The `description` is not valid");
            err.status = 400;
            return next(err);
        } else {
            eventrating.description = description;
        }
    }
    /*            */

    Eventrating.findOneAndUpdate({ userId, eventId }, { eventrating })
        .sort({ createdAt: "desc" })
        .then(event => {
            res.json(event);
        })
        .catch(err => {
            next(err);
        });
});

router.delete('/', jwtAuth, (req, res, next) => {
    const { eventId } = req.body;
    const userId = req.user.id;
    Eventrating.findOneAndDelete({ userId, eventId })
        .then(rating => {
            res.json(rating)
        })
        .catch(err => {
            next(err);
        })
})


module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Rsvpmeetup = require("../models/rsvpmeetup");

const router = express.Router();

/* Jwt Auth */
const jwtAuth = passport.authenticate('jwt', { session: false });

/* Get All Rsvps Endpoint  */

router.get("/all", jwtAuth, (req, res, next) => {
    /* Validation */

    /*            */
    Rsvpmeetup.find()
        .sort({ createdAt: "desc" })
        .then(rsvps => {
            res.json(rsvps);
        })
        .catch(err => {
            next(err);
        });
});


/* Get All meetup rsvps Endpoint by userId */

router.get("/user", jwtAuth, (req, res, next) => {
    const id = req.user.id;
    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error("The `id` is not valid");
        err.status = 400;
        return next(err);
    }
    /*            */
    Rsvpmeetup.find({ userId: id })
        .sort({ createdAt: "desc" })
        .populate("eventId")
        .then(roles => {
            res.json(roles);
        })
        .catch(err => {
            next(err);
        });
});

/* Get All Roles Endpoint by orgId */

router.get("/org/:id", jwtAuth, (req, res, next) => {

    const id = req.params.id;
    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error("The `id` is not valid");
        err.status = 400;
        return next(err);
    }
    /*            */
    Rsvpmeetup.find({ organizationId: id })
        .sort({ createdAt: "desc" })
        .then(roles => {
            res.json(roles);
        })
        .catch(err => {
            next(err);
        });
});



/* Get Single Rsvp Endpoint  */

router.get("/:id", jwtAuth, (req, res, next) => {
    const id = req.params.id;
    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error("The `id` is not valid");
        err.status = 400;
        return next(err);
    }
    /*            */
    Rsvpmeetup.findOne({ _id: id })
        .sort({ createdAt: "desc" })
        .then(rsvps => {
            res.json(rsvps);
        })
        .catch(err => {
            next(err);
        });
});

router.get("/meetup/:id", jwtAuth, (req, res, next) => {
    const id = req.params.id;
    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error("The `id` is not valid");
        err.status = 400;
        return next(err);
    }
    /*            */
    Rsvpmeetup.findOne({ eventId: id })
        .sort({ createdAt: "desc" })
        .then(rsvps => {
            res.json(rsvps);
        })
        .catch(err => {
            next(err);
        });
});

/* Post New Rsvp Endpoint  */

router.post("/", jwtAuth, (req, res, next) => {
    const {eventId} = req.body;
    const userId = req.user.id;

    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        const err = new Error("The `User id` is not valid");
        err.status = 400;
        return next(err);
    }
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        const err = new Error("The `Meetup id` is not valid");
        err.status = 400;
        return next(err);
    }
    /*            */
    const newRsvp = { userId, rsvp: true, eventId };

    Rsvpmeetup.create(newRsvp)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            next(err);
        });
});

/* Put/Edit Rsvp Endpoint  */

router.put("/", jwtAuth, (req, res, next) => {
    const { rsvpId, rsvp } = req.body;
    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(rsvpId)) {
        const err = new Error("The `role id` is not valid");
        err.status = 400;
        return next(err);
    }
    if (!rsvpId) {
        const err = new Error("Missing `rsvpId` in request body");
        err.status = 400;
        return next(err);
    }
    if (typeof rsvpId !== String) {
        const err = new Error("Error 'rsvpId' was not a string");
        err.status = 400;
        return next(err);
    }
    /*            */
    Rsvpmeetup.findOneAndUpdate({ _id: rsvpId }, { rsvp })
        .sort({ createdAt: "desc" })
        .then(rsvp => {
            res.json(rsvp);
        })
        .catch(err => {
            next(err);
        });
});

/* Delete Single Rsvp Endpoint  */

router.delete("/", jwtAuth, (req, res, next) => {
    const {eventId} = req.body;
    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        const err = new Error("The `id` is not valid");
        err.status = 400;
        return next(err);
    }
    /*            */
    Rsvpmeetup.findOneAndDelete({ eventId })
        .then(rsvp => {
            res.json(rsvp);
        })
        .catch(err => {
            next(err);
        });
});
module.exports = router;

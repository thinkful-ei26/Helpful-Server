const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Rsvpmeetup = require("../models/rsvpmeetup");

const router = express.Router();

/* Get All Rsvps Endpoint  */

router.get("/all", (req, res, next) => {
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


/* Get All Roles Endpoint by userId */

router.get("/user/:id", (req, res, next) => {
    const id = req.params.id;
    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error("The `id` is not valid");
        err.status = 400;
        return next(err);
    }
    /*            */
    Rsvpmeetup.find({ userId: id })
        .sort({ createdAt: "desc" })
        .then(roles => {
            res.json(roles);
        })
        .catch(err => {
            next(err);
        });
});

/* Get All Roles Endpoint by orgId */

router.get("/org/:id", (req, res, next) => {

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

router.get("/:id", (req, res, next) => {
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

/* Post New Rsvp Endpoint  */

router.post("/", (req, res, next) => {
    const { userId, meetupId } = req.body;
    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        const err = new Error("The `User id` is not valid");
        err.status = 400;
        return next(err);
    }
    if (!mongoose.Types.ObjectId.isValid(meetupId)) {
        const err = new Error("The `Organization id` is not valid");
        err.status = 400;
        return next(err);
    }
    /*            */
    const newRsvp = { userId, rsvp: true, meetupId };

    Rsvpmeetup.create(newRsvp)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            next(err);
        });
});

/* Put/Edit Rsvp Endpoint  */

router.put("/", (req, res, next) => {
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

router.delete("/", (req, res, next) => {
    const id = req.body;
    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error("The `id` is not valid");
        err.status = 400;
        return next(err);
    }
    /*            */
    Rsvpmeetup.findOneAndDelete({ _id: id })
        .then(rsvp => {
            res.json(rsvp);
        })
        .catch(err => {
            next(err);
        });
});
module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Event = require("../models/meetup");

const router = express.Router();

/* Get All Events Endpoint  */

router.get("/all", (req, res, next) => {
    /* Validation */

    /*            */
    Event.find()
        .sort({ createdAt: "desc" })
        .then(events => {
            res.json(events);
        })
        .catch(err => {
            next(err);
        });
});

/* Get Single Event Endpoint  */
router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error("The `id` is not valid");
        err.status = 400;
        return next(err);
    }
    /*            */

    Event.findOne({ _id: id })
        .sort({ createdAt: "desc" })
        .then(events => {
            res.json(events);
        })
        .catch(err => {
            next(err);
        });
});

/* Post New Event Endpoint  */

router.post("/", (req, res, next) => {
    let { name, description, location, date, contact, imgUrl, userId } = req.body;
    /* Validation */
    if (!name) {
        const err = new Error("The `name` is not valid");
        err.status = 400;
        return next(err);
    }
    if (!description) {
        const err = new Error("The `description` is not valid");
        err.status = 400;
        return next(err);
    }
    if (!location) {
        const err = new Error("The `location` is not valid");
        err.status = 400;
        return next(err);
    }
    if (!date) {
        const err = new Error("The `date` is not valid");
        err.status = 400;
        return next(err);
    }
    if (!contact) {
        const err = new Error("The `contact` is not valid");
        err.status = 400;
        return next(err);
    }
    if (!userId) {
        const err = new Error("The `userId` is not valid");
        err.status = 400;
        return next(err);
    }
    if (!imgUrl) {
        imgUrl = 'https://dummyimage.com/200x200/000/fff'
    }
    /*            */

    const newEvent = { name, description, location, date, contact, imgUrl, userId };
    Event.create(newEvent)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            next(err);
        });
});

/* Put/Edit Event Endpoint  */

router.put("/", (req, res, next) => {
    let { followId, name, location, description, contact, date, imgUrl } = req.body;
    let event = {};
    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(followId)) {
        const err = new Error("The `id` is not valid");
        err.status = 400;
        return next(err);
    }
    if (name) {
        if (typeof name !== String) {
            const err = new Error("The `name` is not valid");
            err.status = 400;
            return next(err);
        } else {
            event.name = name;
        }
    }
    if (description) {
        if (typeof description !== String) {
            const err = new Error("The `description` is not valid");
            err.status = 400;
            return next(err);
        } else {
            event.description = description;
        }
    }
    if (location) {
        if (typeof location !== String) {
            const err = new Error("The `location` is not valid");
            err.status = 400;
            return next(err);
        } else {
            event.location = location;
        }
    }
    if (date) {
        if (typeof date !== String) {
            const err = new Error("The `date` is not valid");
            err.status = 400;
            return next(err);
        } else {
            event.date = date;
        }
    }
    if (contact) {
        if (typeof contact !== String) {
            const err = new Error("The `contact` is not valid");
            err.status = 400;
            return next(err);
        } else {
            event.contact = contact;
        }
    }
    if (!imgUrl) {
        imgUrl = 'https://dummyimage.com/200x200/000/fff'
    }
    if (imgUrl) {
        if (typeof imgUrl !== String) {
            const err = new Error("The `imgUrl` is not valid");
            err.status = 400;
            return next(err);
        } else {
            event.imgUrl = imgUrl;
        }
    }
    /*            */

    Event.findOneAndUpdate({ _id: followId }, { event })
        .sort({ createdAt: "desc" })
        .then(event => {
            res.json(event);
        })
        .catch(err => {
            next(err);
        });
});

/* Delete Single Event Endpoint  */

router.delete("/", (req, res, next) => {
    const id = req.body;
    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error("The `id` is not valid");
        err.status = 400;
        return next(err);
    }
    /*            */
    Event.findOneAndDelete({ _id: id })
        .then(event => {
            res.json(event);
        })
        .catch(err => {
            next(err);
        });
});

module.exports = router;

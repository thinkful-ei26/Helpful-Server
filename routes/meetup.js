const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const {getGeoLocation, getDistance} = require("../utils/geo-location");
const Meetup = require("../models/meetup");

const router = express.Router();

/* Jwt Auth */
const jwtAuth = passport.authenticate('jwt', { session: false });

/* Get All Meetups Endpoint  */
router.get("/all", jwtAuth, (req, res, next) => {
    /* Validation */

    /*            */
    Meetup.find()
        .sort({ createdAt: "desc" })
        .then(meetups => {
            res.json(meetups);
        })
        .catch(err => {
            next(err);
        });
});

/* Get Single Meetup Endpoint  */
router.get("/:id", jwtAuth, (req, res, next) => {
    const id = req.params.id;
    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error("The `id` is not valid");
        err.status = 400;
        return next(err);
    }
    /*            */

    Meetup.findOne({ _id: id })
        .sort({ createdAt: "desc" })
        .then(events => {
            res.json(events);
        })
        .catch(err => {
            next(err);
        });
});


/* Get Meetup by user Id */
router.get('/owner/:id', jwtAuth, (req, res, next) => {
    const userId = req.params.id;
    console.log(userId)
    Meetup.find({ userId })
        .sort({ createdAt: "desc" })
        .then(meetups => {
            res.json(meetups);
        })
        .catch(err => {
            next(err);
        });
})

/* Post New Meetup Endpoint  */
router.post("/", jwtAuth, (req, res, next) => {
    let { name, description, location, date, contact, imgUrl } = req.body;
    let userId = req.user.id;
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
    getGeoLocation(location)
    .then(geoLocation => {
        const newMeetup = { name, description, location, geoLocation, date, contact, imgUrl, userId };
        Meetup.create(newMeetup)
            .then(response => {
                res.json(response);
            })
            .catch(err => {
                next(err);
            });
    });

    
});

/* Put/Edit Meetup Endpoint  ************************** BROKEN */
router.put("/", jwtAuth, (req, res, next) => {
    let { name, location, description, contact, date, imgUrl } = req.body;
    let userId = req.user.id;
    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        const err = new Error("The `id` is not valid");
        err.status = 400;
        return next(err);
    }
    // if (name) {
    //     if (typeof name !== String) {
    //         const err = new Error("The `name` is not valid");
    //         err.status = 400;
    //         return next(err);
    //     } else {
    //         meetup.name = name;
    //     }
    // }
    // if (description) {
    //     if (typeof description !== String) {
    //         const err = new Error("The `description` is not valid");
    //         err.status = 400;
    //         return next(err);
    //     } else {
    //         meetup.description = description;
    //     }
    // }
    // if (location) {
    //     if (typeof location !== String) {
    //         const err = new Error("The `location` is not valid");
    //         err.status = 400;
    //         return next(err);
    //     } else {
    //         meetup.location = location;
    //     }
    // }
    // if (date) {
    //     if (typeof date !== String) {
    //         const err = new Error("The `date` is not valid");
    //         err.status = 400;
    //         return next(err);
    //     } else {
    //         meetup.date = date;
    //     }
    // }
    // if (contact) {
    //     if (typeof contact !== String) {
    //         const err = new Error("The `contact` is not valid");
    //         err.status = 400;
    //         return next(err);
    //     } else {
    //         meetup.contact = contact;
    //     }
    // }
    if (!imgUrl) {
        imgUrl = 'https://dummyimage.com/200x200/000/fff'
    }
    // if (imgUrl) {
    //     if (typeof imgUrl !== String) {
    //         const err = new Error("The `imgUrl` is not valid");
    //         err.status = 400;
    //         return next(err);
    //     } else {
    //         meetup.imgUrl = imgUrl;
    //     }
    // }
    /*            */
    getGeoLocation(location)
        .then(geoLocation => {
            const newMeetup = { name, description, location, geoLocation, date, contact, imgUrl, userId };
            Meetup.findOneAndUpdate({ _id: userId }, { newMeetup })
                .then(meetup => {
                    res.json(meetup);
                })
                .catch(err => {
                    next(err);
                });
        });
});

/* Delete Single Meetup Endpoint  */

router.delete("/", jwtAuth, (req, res, next) => {
    const {id} = req.body;
    /* Validation */
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error("The `id` is not valid");
        err.status = 400;
        return next(err);
    }
    /*            */
    Meetup.findOneAndDelete({ _id: id })
        .then(() => {
            res.json('deleted').status(202);
        })
        .catch(err => {
            next(err);
        });
});

module.exports = router;

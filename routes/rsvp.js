const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Rsvp = require("../models/rsvp");

const router = express.Router();

/* Jwt Auth */
const jwtAuth = passport.authenticate('jwt', { session: false });

/* Get All Rsvps Endpoint  */
// get all rsvp's
router.get("/all", jwtAuth, (req, res, next) => {
  /* Validation */

  /*            */
  Rsvp.find()
    .sort({ createdAt: "desc" })
    .then(rsvps => {
      res.json(rsvps);
    })
    .catch(err => {
      next(err);
    });
});

// get all rsvp's for a user
router.get("/user", jwtAuth, (req, res, next) => {
  const userId = req.user.id;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error("The `userId` is not valid");
    err.status = 400;
    return next(err);
  }
  Rsvp.find({ userId })
    .sort({ createdAt: "desc" })
    // populate event
    .populate('eventId')
    .then(rsvps => {
      res.json(rsvps);
    })
    .catch(err => {
      next(err);
    });
});

// get all rsvp's for an event
router.get("/event/:eventId", jwtAuth, (req, res, next) => {
  const eventId = req.params.eventId;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    const err = new Error("The `eventId` is not valid");
    err.status = 400;
    return next(err);
  }
  Rsvp.find({ eventId })
    .sort({ createdAt: "desc" })
    .then(rsvps => {
      res.json(rsvps);
    })
    .catch(err => {
      next(err);
    });
});

/* Get Single Rsvp Endpoint  */
// get rsvp by id
router.get("/:id", jwtAuth, (req, res, next) => {
  const id = req.params.id;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("The `id` is not valid");
    err.status = 400;
    return next(err);
  }
  Rsvp.findOne({ _id: id })
    .sort({ createdAt: "desc" })
    .then(rsvps => {
      res.json(rsvps);
    })
    .catch(err => {
      next(err);
    });
});

// get rsvp by userId and eventId
router.get("/specific/:eventId", jwtAuth, (req, res, next) => {
  const eventId = req.params;
  const userId = req.user.id;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error("The `user id` is not valid");
    err.status = 400;
    return next(err);
  }
  Rsvp.findOne({ userId, eventId })
    .then(rsvp => {
      res.json(rsvp);
    })
    .catch(err => {
      next(err);
    });
});

/* Post New Rsvp Endpoint  */

router.post("/", jwtAuth, (req, res, next) => {
  const { eventId } = req.body;
  const userId = req.user.id;

  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error("The `User id` is not valid");
    err.status = 400;
    return next(err);
  }
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    const err = new Error("The `Event id` is not valid");
    err.status = 400;
    return next(err);
  }
  /*            */
  const newRsvp = { userId, rsvp: true, eventId };

  Rsvp.create(newRsvp)
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
  Rsvp.findOneAndUpdate({ _id: rsvpId }, { rsvp })
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
  const id = req.body;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("The `id` is not valid");
    err.status = 400;
    return next(err);
  }
  /*            */
  Rsvp.findOneAndDelete({ _id: id })
    .then(rsvp => {
      res.json(rsvp);
    })
    .catch(err => {
      next(err);
    });
});

// delete rsvp by user id and event id
router.delete("/user", jwtAuth, (req, res, next) => {
  const { userId, eventId } = req.body;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error("The `id` is not valid");
    err.status = 400;
    return next(err);
  }
  /*            */
  Rsvp.deleteOne({ userId, eventId })
    .then(rsvp => {
      res.json(rsvp);
    })
    .catch(err => {
      next(err);
    });
});
module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Rsvp = require("../models/rsvp");

const router = express.Router();

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
  Rsvp.findOne(id)
    .sort({ createdAt: "desc" })
    .then(rsvps => {
      res.json(rsvps);
    })
    .catch(err => {
      next(err);
    });
});

/* Get All Rsvps Endpoint  */

router.get("/all", (req, res, next) => {
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

/* Post New Rsvp Endpoint  */

router.post("/", (req, res, next) => {
  const { userId, orgId, rsvp } = req.body;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error("The `User id` is not valid");
    err.status = 400;
    return next(err);
  }
  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    const err = new Error("The `Organization id` is not valid");
    err.status = 400;
    return next(err);
  }
  if (!rsvp) {
    const err = new Error("Missing `rsvp` in request body");
    err.status = 400;
    return next(err);
  }
  if (typeof rsvp !== String) {
    const err = new Error("Error 'rsvp' was not a string");
    err.status = 400;
    return next(err);
  }
  /*            */
  const newRsvp = { userId, rsvp, orgId };

  Rsvp.create(newRsvp)
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

router.delete("/", (req, res, next) => {
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
module.exports = router;

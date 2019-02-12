const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Rsvp = require("../models/rsvp");

const router = express.Router();

router.get("/", (req, res, next) => {
  Rsvp.findOne()
    .sort({ createdAt: "desc" })
    .then(rsvps => {
      res.json(rsvps);
    })
    .catch(err => {
      next(err);
    });
});

router.get("/all", (req, res, next) => {
  Rsvp.find()
    .sort({ createdAt: "desc" })
    .then(rsvps => {
      res.json(rsvps);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  const newRsvp = req.body;

  Rsvp.create(newRsvp)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

router.put("/", (req, res, next) => {
  const { rsvpId, rsvp } = req.body;

  Rsvp.findOneAndUpdate({ _id: rsvpId }, { rsvp })
    .sort({ createdAt: "desc" })
    .then(rsvp => {
      res.json(rsvp);
    })
    .catch(err => {
      next(err);
    });
});

router.delete("/", (req, res, next) => {
  const id = req.body;
  Rsvp.findOneAndDelete({ _id: id })
    .then(rsvp => {
      res.json(rsvp);
    })
    .catch(err => {
      next(err);
    });
});
module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Event = require("../models/event");

const router = express.Router();

router.get("/", (req, res, next) => {
  Event.findOne()
    .sort({ createdAt: "desc" })
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      next(err);
    });
});

router.get("/all", (req, res, next) => {
  Event.find()
    .sort({ createdAt: "desc" })
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  const newEvent = req.body;

  Event.create(newEvent)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;

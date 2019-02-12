const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Following = require("../models/following");

const router = express.Router();

router.get("/", (req, res, next) => {
  Following.findOne()
    .sort({ createdAt: "desc" })
    .then(follows => {
      res.json(follows);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  const newFollow = req.body;

  Following.create(newFollow)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;

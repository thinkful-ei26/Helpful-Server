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

router.put("/", (req, res, next) => {
  const { id, following } = req.body;

  Following.findOneAndUpdate({ _id: followId }, { following })
    .sort({ createdAt: "desc" })
    .then(follow => {
      res.json(follow);
    })
    .catch(err => {
      next(err);
    });
});

router.delete("/", (req, res, next) => {
  const id = req.body;
  Following.findOneAndDelete({ _id: id })
    .then(follow => {
      res.json(follow);
    })
    .catch(err => {
      next(err);
    });
});
module.exports = router;

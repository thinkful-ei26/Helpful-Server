const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Role = require("../models/organization");

const router = express.Router();

router.get("/", (req, res, next) => {
  Role.findOne()
    .sort({ createdAt: "desc" })
    .then(roles => {
      res.json(roles);
    })
    .catch(err => {
      next(err);
    });
});

router.get("/all", (req, res, next) => {
  Role.find()
    .sort({ createdAt: "desc" })
    .then(roles => {
      res.json(roles);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  const newRole = req.body;

  Role.create(newRole)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;

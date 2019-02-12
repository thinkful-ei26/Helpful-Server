const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Organization = require("../models/organization");

const router = express.Router();

router.get("/", (req, res, next) => {
  Organization.findOne()
    .sort({ createdAt: "desc" })
    .then(organizations => {
      res.json(organizations);
    })
    .catch(err => {
      next(err);
    });
});

router.get("/all", (req, res, next) => {
  Organization.find()
    .sort({ createdAt: "desc" })
    .then(organizations => {
      res.json(organizations);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  const newOrganization = req.body;

  Organization.create(newOrganization)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;

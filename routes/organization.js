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

router.put("/", (req, res, next) => {
  const {
    organizationId,
    name,
    location,
    description,
    contact,
    date
  } = req.body;

  const updated = { name, location, description, contact, date };

  Organization.findOneAndUpdate({ _id: organizationId }, { updated })
    .sort({ createdAt: "desc" })
    .then(organization => {
      res.json(organization);
    })
    .catch(err => {
      next(err);
    });
});

router.delete("/", (req, res, next) => {
  const id = req.body;
  Organization.findOneAndDelete({ _id: id })
    .then(organization => {
      res.json(organization);
    })
    .catch(err => {
      next(err);
    });
});
module.exports = router;

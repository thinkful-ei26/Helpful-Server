const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Role = require("../models/role");

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

router.put("/", (req, res, next) => {
  const { roleId, role } = req.body;

  Role.findOneAndUpdate({ _id: roleId }, { role })
    .sort({ createdAt: "desc" })
    .then(role => {
      res.json(role);
    })
    .catch(err => {
      next(err);
    });
});

router.delete("/", (req, res, next) => {
  const id = req.body;
  Role.findOneAndDelete({ _id: id })
    .then(role => {
      res.json(role);
    })
    .catch(err => {
      next(err);
    });
});
module.exports = router;

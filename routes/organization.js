const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Organization = require("../models/organization");

const router = express.Router();

/* Get All Organizations Endpoint  */

router.get("/all", (req, res, next) => {
  /* Validation */

  /*            */
  Organization.find()
    .sort({ createdAt: "desc" })
    .then(organizations => {
      res.json(organizations);
    })
    .catch(err => {
      next(err);
    });
});

/* Get Single Organization Endpoint  */

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("The `id` is not valid");
    err.status = 400;
    return next(err);
  }
  /*            */
  Organization.findOne({ _id: id })
    .sort({ createdAt: "desc" })
    .then(organizations => {
      res.json(organizations);
    })
    .catch(err => {
      next(err);
    });
});

/* Post New Organization Endpoint  */

router.post("/", (req, res, next) => {
  const { name, description, location, date, contact } = req.body;
  /* Validation */
  if (!name) {
    const err = new Error("The `name` is not valid");
    err.status = 400;
    return next(err);
  }
  if (!description) {
    const err = new Error("The `description` is not valid");
    err.status = 400;
    return next(err);
  }
  if (!location) {
    const err = new Error("The `location` is not valid");
    err.status = 400;
    return next(err);
  }
  if (!date) {
    const err = new Error("The `date` is not valid");
    err.status = 400;
    return next(err);
  }
  if (!contact) {
    const err = new Error("The `contact` is not valid");
    err.status = 400;
    return next(err);
  }
  /*            */

  const newOrganization = { name, description, location, date, contact };

  Organization.create(newOrganization)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

/* Put/Edit Organization Endpoint  */

router.put("/", (req, res, next) => {
  const {
    organizationId,
    name,
    location,
    description,
    contact,
    date
  } = req.body;

  let organization = {};
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(followId)) {
    const err = new Error("The `id` is not valid");
    err.status = 400;
    return next(err);
  }
  if (name) {
    if (typeof name !== String) {
      const err = new Error("The `name` is not valid");
      err.status = 400;
      return next(err);
    } else {
      organization.name = name;
    }
  }
  if (description) {
    if (typeof description !== String) {
      const err = new Error("The `description` is not valid");
      err.status = 400;
      return next(err);
    } else {
      organization.description = description;
    }
  }
  if (location) {
    if (typeof location !== String) {
      const err = new Error("The `location` is not valid");
      err.status = 400;
      return next(err);
    } else {
      organization.location = location;
    }
  }
  if (date) {
    if (typeof date !== String) {
      const err = new Error("The `date` is not valid");
      err.status = 400;
      return next(err);
    } else {
      organization.date = date;
    }
  }
  if (contact) {
    if (typeof contact !== String) {
      const err = new Error("The `contact` is not valid");
      err.status = 400;
      return next(err);
    } else {
      organization.contact = contact;
    }
  }
  /*            */

  Organization.findOneAndUpdate({ _id: organizationId }, { organization })
    .sort({ createdAt: "desc" })
    .then(organization => {
      res.json(organization);
    })
    .catch(err => {
      next(err);
    });
});

/* Delete Single Organization Endpoint  */

router.delete("/", (req, res, next) => {
  const id = req.body;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("The `id` is not valid");
    err.status = 400;
    return next(err);
  }
  /*            */
  Organization.findOneAndDelete({ _id: id })
    .then(organization => {
      res.json(organization);
    })
    .catch(err => {
      next(err);
    });
});
module.exports = router;

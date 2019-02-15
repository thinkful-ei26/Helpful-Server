const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Role = require("../models/role");

const router = express.Router();

/* Get All Roles Endpoint  */

router.get("/all", (req, res, next) => {
  /* Validation */

  /*            */
  Role.find()
    .sort({ createdAt: "desc" })
    .then(roles => {
      res.json(roles);
    })
    .catch(err => {
      next(err);
    });
});


/* Get All Roles Endpoint by userId */

router.get("/user/:id", (req, res, next) => {
  const id = req.params.id;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("The `id` is not valid");
    err.status = 400;
    return next(err);
  }
  /*            */
  Role.find({ userId: id })
    .sort({ createdAt: "desc" })
    .then(roles => {
      res.json(roles);
    })
    .catch(err => {
      next(err);
    });
});

/* Get All Roles Endpoint by orgId */

router.get("/org/:id", (req, res, next) => {

  const id = req.params.id;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("The `id` is not valid");
    err.status = 400;
    return next(err);
  }
  /*            */
  Role.find({ organizationId: id })
    .sort({ createdAt: "desc" })
    .then(roles => {
      res.json(roles);
    })
    .catch(err => {
      next(err);
    });
});


/* Get Single Role Endpoint  */

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("The `id` is not valid");
    err.status = 400;
    return next(err);
  }
  /*            */
  Role.findOne({ _id: id })
    .sort({ createdAt: "desc" })
    .then(roles => {
      res.json(roles);
    })
    .catch(err => {
      next(err);
    });
});

/* Post New Role Endpoint  */

router.post("/", (req, res, next) => {
  const { userId, orgId, role } = req.body;
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
  if (!role) {
    const err = new Error("Missing `role` in request body");
    err.status = 400;
    return next(err);
  }
  if (typeof role !== "string") {
    console.log(typeof role);
    const err = new Error("Error 'role' was not a string");
    err.status = 400;
    return next(err);
  }
  /*            */
  const newRole = { userId, role, organizationId: orgId };
  Role.create(newRole)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

/* Put/Edit Role Endpoint  */

router.put("/", (req, res, next) => {
  const { roleId, role } = req.body;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(roleId)) {
    const err = new Error("The `role id` is not valid");
    err.status = 400;
    return next(err);
  }
  if (!role) {
    const err = new Error("Missing `role` in request body");
    err.status = 400;
    return next(err);
  }
  if (typeof role !== String) {
    const err = new Error("Error 'role' was not a string");
    err.status = 400;
    return next(err);
  }
  /*            */

  Role.findOneAndUpdate({ _id: roleId }, { role })
    .sort({ createdAt: "desc" })
    .then(role => {
      res.json(role);
    })
    .catch(err => {
      next(err);
    });
});

/* Delete Single Role Endpoint  */

router.delete("/", (req, res, next) => {
  const id = req.body;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("The `id` is not valid");
    err.status = 400;
    return next(err);
  }
  /*            */
  Role.findOneAndDelete({ _id: id })
    .then(role => {
      res.json(role);
    })
    .catch(err => {
      next(err);
    });
});
module.exports = router;

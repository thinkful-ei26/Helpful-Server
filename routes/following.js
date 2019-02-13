const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Following = require("../models/following");

const router = express.Router();

/* Get All Follows Endpoint  */

router.get("/all", (req, res, next) => {
  /* Validation */

  /*            */
  Following.findOne()
    .sort({ createdAt: "desc" })
    .then(follows => {
      res.json(follows);
    })
    .catch(err => {
      next(err);
    });
});

/* Get Single Follow Endpoint  */

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("The `id` is not valid");
    err.status = 400;
    return next(err);
  }
  /*            */
  Following.findOne(id)
    .sort({ createdAt: "desc" })
    .then(follows => {
      res.json(follows);
    })
    .catch(err => {
      next(err);
    });
});

/* Post New Follow Endpoint  */

router.post("/", (req, res, next) => {
  const { userId, orgId } = req.body;
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
  /*            */
  const newFollow = { userId, following: true, orgId };
  Following.create(newFollow)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

/* Put/Edit Follow Endpoint  */

router.put("/", (req, res, next) => {
  const { id, following } = req.body;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("The `id` is not valid");
    err.status = 400;
    return next(err);
  }
  if (typeof following !== Boolean) {
    const err = new Error("The `Follow input` is not valid");
    err.status = 400;
    return next(err);
  }
  /*            */
  Following.findOneAndUpdate({ _id: followId }, { following })
    .sort({ createdAt: "desc" })
    .then(follow => {
      res.json(follow);
    })
    .catch(err => {
      next(err);
    });
});

/* Delete Single Follow Endpoint  */

router.delete("/", (req, res, next) => {
  const id = req.body;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("The `id` is not valid");
    err.status = 400;
    return next(err);
  }
  /*            */
  Following.findOneAndDelete({ _id: id })
    .then(follow => {
      res.json(follow);
    })
    .catch(err => {
      next(err);
    });
});
module.exports = router;

'use strict';
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Orgrating = require('../models/orgrating');
const router = express.Router();

/* JWT Auth */

const jwtAuth = passport.authenticate('jwt', { session: false });

/* Get all  */

router.get('/', jwtAuth, (req, res, next) => {
  Orgrating.find()
    .sort({ createdAt: 'desc' })
    .then(ratings => {
      res.json(ratings);
    })
    .catch(err => {
      next(err);
    });
});

/* Get all per ratings an organization  */

router.get('/org/:orgId', jwtAuth, (req, res, next) => {
  const orgId = req.params.orgId;
  Orgrating.find({ organizationId: orgId })
    .sort({ createdAt: 'desc' })
    .then(ratings => {
      res.json(ratings);
    })
    .catch(err => {
      next(err);
    });
});

/* Get a specific rating via userid and organization id  */

router.get('/user', jwtAuth, (req, res, next) => {
  const orgId = req.body;
  const userId = req.user.id;
  Orgrating.find({ userId, organizationId: orgId })
    .sort({ createdAt: 'desc' })
    .then(ratings => {
      res.json(ratings);
    })
    .catch(err => {
      next(err);
    });
});

/* Get all ratings from a user */

router.get('/user/all', jwtAuth, (req, res, next) => {
  const userId = req.user.id;
  Orgrating.find({ userId })
    .sort({ createdAt: 'desc' })
    .then(ratings => {
      res.json(ratings);
    })
    .catch(err => {
      next(err);
    });
});

/* Post New Rating Endpoint  */

router.post('/', jwtAuth, (req, res, next) => {
  const { orgId, rating, description } = req.body;
  const userId = req.user.id;

  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }
  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }
  if (!rating) {
    const err = new Error('The `rating` is not valid');
    err.status = 400;
    return next(err);
  }
  if (!description) {
    const err = new Error('The `description` is not valid');
    err.status = 400;
    return next(err);
  }
  /*            */

  const newRating = { userId, rating, description, organizationId: orgId };
  Orgrating.create(newRating)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

router.put('/', jwtAuth, (req, res, next) => {
  let { rating, description, orgId } = req.body;
  const userId = req.user.id;
  let orgrating = {};
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `userid` is not valid');
    err.status = 400;
    return next(err);
  }
  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    const err = new Error('The `orgid` is not valid');
    err.status = 400;
    return next(err);
  }
  if (rating) {
    if (typeof rating !== String) {
      const err = new Error('The `rating` is not valid');
      err.status = 400;
      return next(err);
    } else {
      orgrating.rating = rating;
    }
  }
  if (description) {
    if (typeof description !== String) {
      const err = new Error('The `description` is not valid');
      err.status = 400;
      return next(err);
    } else {
      orgrating.description = description;
    }
  }
  /*            */

  Orgrating.findOneAndUpdate({ userId, organizationId: orgId }, { orgrating })
    .sort({ createdAt: 'desc' })
    .then(event => {
      res.json(event);
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/', jwtAuth, (req, res, next) => {
  const { orgId } = req.body;
  const userId = req.user.id;
  Orgrating.findOneAndDelete({ userId, orgId })
    .then(rating => {
      res.json(rating);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;

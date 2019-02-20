'use strict';
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Comments = require('../models/comments');

const router = express.Router();

/* JWT Auth */

const jwtAuth = passport.authenticate('jwt', { session: false });

/* Get all  */

router.get('/', jwtAuth, (req, res, next) => {
  Comments.find()
    .sort({ createdAt: 'desc' })
    .then(comments => {
      res.json(comments);
    })
    .catch(err => {
      next(err);
    });
});

/* Get all per comments an organization  */

router.get('/comments', jwtAuth, (req, res, next) => {
  const orgId = req.body;
  Comments.find({ organizationId: orgId })
    .sort({ createdAt: 'desc' })
    .then(comments => {
      res.json(comments);
    })
    .catch(err => {
      next(err);
    });
});

/* Get a specificcomment via userid and organization id  */

router.get('/user', jwtAuth, (req, res, next) => {
  const orgId = req.body;
  const userId = req.user.id;
  Comments.find({ userId, organizationId: orgId })
    .sort({ createdAt: 'desc' })
    .then(comments => {
      res.json(comments);
    })
    .catch(err => {
      next(err);
    });
});

/* Get all comments from a user */

router.get('/user/all', jwtAuth, (req, res, next) => {
  const userId = req.user.id;
  Comments.find({ userId })
    .sort({ createdAt: 'desc' })
    .then(comments => {
      res.json(comments);
    })
    .catch(err => {
      next(err);
    });
});

/* Post New Event Endpoint  */

router.post('/', jwtAuth, (req, res, next) => {
  const { orgId,comment, description } = req.body;
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
  if (!comment) {
    const err = new Error('The `comment` is not valid');
    err.status = 400;
    return next(err);
  }
  if (!description) {
    const err = new Error('The `description` is not valid');
    err.status = 400;
    return next(err);
  }
  /*            */

  const newComment = { userId,comment, description, organizationId: orgId };
  Comments.create(newComment)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

router.put('/', jwtAuth, (req, res, next) => {
  let {comment, description, orgId } = req.body;
  const userId = req.user.id;
  let Comments = {};
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
  if (comment) {
    if (typeof comment !== String) {
      const err = new Error('The `comment` is not valid');
      err.status = 400;
      return next(err);
    } else {
      Comments.rating =comment;
    }
  }
  if (description) {
    if (typeof description !== String) {
      const err = new Error('The `description` is not valid');
      err.status = 400;
      return next(err);
    } else {
      Comments.description = description;
    }
  }
  /*            */

  Comments.findOneAndUpdate({ userId, organizationId: orgId }, { Comments })
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
  Comments.findOneAndDelete({ userId, orgId })
    .then(rating => {
      res.json(rating);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;

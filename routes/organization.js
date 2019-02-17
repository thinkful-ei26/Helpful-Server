'use strict';
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Organization = require('../models/organization');

const router = express.Router();

/* Jwt Auth */
const jwtAuth = passport.authenticate('jwt', { session: false });

/* Get All Organizations Endpoint  */

router.get('/all', jwtAuth, (req, res, next) => {
  /* Validation */

  /*            */
  Organization.find()
    .sort({ createdAt: 'desc' })
    .then(organizations => {
      res.json(organizations);
    })
    .catch(err => {
      next(err);
    });
});

/* Get Single Organization Endpoint  */

router.get('/:id', jwtAuth, (req, res, next) => {
  const id = req.params.id;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }
  /*            */
  Organization.findOne({ _id: id })
    .sort({ createdAt: 'desc' })
    .then(organizations => {
      res.json(organizations);
    })
    .catch(err => {
      next(err);
    });
});

/* Post New Organization Endpoint  */

router.post('/', jwtAuth, (req, res, next) => {
  let { name, description, location, contact, imgUrl } = req.body;
  /* Validation */
  if (!name) {
    const err = new Error('The `name` is not valid');
    err.status = 400;
    return next(err);
  }
  if (!description) {
    const err = new Error('The `description` is not valid');
    err.status = 400;
    return next(err);
  }
  if (!location) {
    const err = new Error('The `location` is not valid');
    err.status = 400;
    return next(err);
  }
  if (!contact) {
    const err = new Error('The `contact` is not valid');
    err.status = 400;
    return next(err);
  }
  if (!imgUrl) {
    imgUrl = 'https://dummyimage.com/200x200/000/fff';
  }
  /*            */

  const newOrganization = { name, description, location, contact, imgUrl };

  Organization.create(newOrganization)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

/* Put/Edit Organization Endpoint  */

router.put('/', jwtAuth, (req, res, next) => {
  let {
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
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }
  if (name) {
    if (typeof name !== String) {
      const err = new Error('The `name` is not valid');
      err.status = 400;
      return next(err);
    } else {
      organization.name = name;
    }
  }
  if (description) {
    if (typeof description !== String) {
      const err = new Error('The `description` is not valid');
      err.status = 400;
      return next(err);
    } else {
      organization.description = description;
    }
  }
  if (location) {
    if (typeof location !== String) {
      const err = new Error('The `location` is not valid');
      err.status = 400;
      return next(err);
    } else {
      organization.location = location;
    }
  }
  if (date) {
    if (typeof date !== String) {
      const err = new Error('The `date` is not valid');
      err.status = 400;
      return next(err);
    } else {
      organization.date = date;
    }
  }
  if (contact) {
    if (typeof contact !== String) {
      const err = new Error('The `contact` is not valid');
      err.status = 400;
      return next(err);
    } else {
      organization.contact = contact;
    }
  }
  if (!imgUrl) {
    imgUrl = 'https://dummyimage.com/200x200/000/fff';
  }
  if (imgUrl) {
    if (typeof imgUrl !== String) {
      const err = new Error('The `imgUrl` is not valid');
      err.status = 400;
      return next(err);
    } else {
      organization.imgUrl = imgUrl;
    }
  }
  /*            */

  Organization.findOneAndUpdate({ _id: organizationId }, { organization })
    .sort({ createdAt: 'desc' })
    .then(organization => {
      res.json(organization);
    })
    .catch(err => {
      next(err);
    });
});

/* Delete Single Organization Endpoint  */

router.delete('/', jwtAuth, (req, res, next) => {
  const id = req.body;
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
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

'use strict';
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const { getGeoLocation, getDistance } = require("../utils/geo-location");

const Organization = require('../models/organization');
const Role = require('../models/role');

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

/* Get all events within x distance */
router.get('/location/:range/:lat/:lng', jwtAuth, (req, res, next) => {
  const { range, lat, lng } = req.params;
  const origins = `${lat},${lng}`;
  /* Validation */

  /*            */
  Organization.find() // maybe query by some small range of lat and lng to condense filter by general area
    .then(orgs => {
      return Promise.all(orgs.map(org => {
        let destinations = `${org.geoLocation.lat},${org.geoLocation.lng}`;
        return getDistance(origins, destinations)
          .then(distance => {
            if (distance <= range) {
              return org
            }
          })
      }))
        .then(orgs => {
          let filtered = orgs.filter(org => org != null);
          console.log(filtered)
          return res.json(filtered);
        })
        .catch(err => {
          next(err);
        });
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
  let userId = req.user.id;

  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `userId` is not valid');
    err.status = 400;
    return next(err);
  }

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

  getGeoLocation(location)
    .then(geoLocation => {
      const newOrganization = { name, description, location, geoLocation, contact, imgUrl };

      Organization.create(newOrganization)
        .then(response => {
          res.json(response);
          return response;
        })
        // create admin role
        .then((newOrg) => {

          const newAdmin = {
            userId: userId,
            role: 'admin',
            organizationId: newOrg._id,
          };

          Role.create(newAdmin);
        })
        .catch(err => {
          next(err);
        });

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

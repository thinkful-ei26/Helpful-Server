'use strict';
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const {getGeoLocation, getDistance} = require("../utils/geo-location");
const Event = require("../models/event");

const router = express.Router();

/* Jwt Auth */
const jwtAuth = passport.authenticate('jwt', { session: false });

/* Get All Events Endpoint  */

router.get('/all', jwtAuth, (req, res, next) => {
  /* Validation */

  /*            */
  Event.find()
    .sort({ createdAt: 'desc' })
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      next(err);
    });
});

/* Get all events within x distance */
router.get('/location/:range/:lat/:lng', jwtAuth, (req, res, next) => {
  const {range, lat, lng} = req.params;
  const origins = `${lat},${lng}`;
  /* Validation */

  /*            */
  console.log('params ', req.params)
  Event.find() // maybe query by some small range of lat and lng to condense filter by general area
    .then(events => {
      return Promise.all(events.map(event => {
        let destinations = `${event.geoLocation.lat},${event.geoLocation.lng}`;
        return getDistance(origins, destinations)
        .then(distance => {
          if(distance <= range) {
            return event
          }
        })
      }))
      .then(events => {
        let filtered = events.filter(event => event != null);
        return res.json(filtered);
      })
      .catch(err => {
        next(err);
      });
    })
    
});

/* Get Single Event Endpoint  */
router.get('/:id', jwtAuth, (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;
  console.log(id)
  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }
  /*            */

  Event.findOne({ _id: id })
    .sort({ createdAt: 'desc' })
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      next(err);
    });
});

/* Get Events by org Id */

router.get('/org/:id', jwtAuth, (req, res, next) => {
  const orgId = req.params.id;
  console.log(orgId)
  Event.find({ organizationId: orgId })
    .sort({ createdAt: "desc" })
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      next(err);
    });

})


/* Post New Event Endpoint  */

router.post("/", jwtAuth, (req, res, next) => {
  let { name, description, location, date, contact, imgUrl, orgId } = req.body;
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
  if (!date) {
    const err = new Error('The `date` is not valid');
    err.status = 400;
    return next(err);
  }
  if (!contact) {
    const err = new Error('The `contact` is not valid');
    err.status = 400;
    return next(err);
  }
  if (!orgId) {
    const err = new Error("The `orgId` is not valid");
    err.status = 400;
    return next(err);
  }
  if (!imgUrl) {
    imgUrl = 'https://dummyimage.com/200x200/000/fff';
  }
  /*            */

  getGeoLocation(location)
    .then(geoLocation => {
      const newEvent = { name, description, location, geoLocation, date, contact, imgUrl, organizationId: orgId };
      Event.create(newEvent)
        .then(response => {
          res.json(response);
        })
        .catch(err => {
          next(err);
        });
    })


});

/* Put/Edit Event Endpoint  */

router.put('/', jwtAuth, (req, res, next) => {
  let { followId, name, location, description, contact, date, imgUrl } = req.body;
  let event = {};
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
      event.name = name;
    }
  }
  if (description) {
    if (typeof description !== String) {
      const err = new Error('The `description` is not valid');
      err.status = 400;
      return next(err);
    } else {
      event.description = description;
    }
  }
  if (location) {
    if (typeof location !== String) {
      const err = new Error('The `location` is not valid');
      err.status = 400;
      return next(err);
    } else {
      event.location = location;
    }
  }
  if (date) {
    if (typeof date !== String) {
      const err = new Error('The `date` is not valid');
      err.status = 400;
      return next(err);
    } else {
      event.date = date;
    }
  }
  if (contact) {
    if (typeof contact !== String) {
      const err = new Error('The `contact` is not valid');
      err.status = 400;
      return next(err);
    } else {
      event.contact = contact;
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
      event.imgUrl = imgUrl;
    }
  }
  /*            */

  Event.findOneAndUpdate({ _id: followId }, { event })
    .sort({ createdAt: 'desc' })
    .then(event => {
      res.json(event);
    })
    .catch(err => {
      next(err);
    });
});

/* Delete Single Event Endpoint  */


router.delete("/", jwtAuth, (req, res, next) => {
  const { id } = req.body;

  /* Validation */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }
  /*            */
  Event.findOneAndDelete({ _id: id })
    .then(event => {
      res.json(event);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;

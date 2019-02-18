const axios = require('axios');
const { GOOGLE_KEY } = require("../config");

const geoCode = (address) => {
  try {
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address,
          key: GOOGLE_KEY
        }
      });
  } catch (error) {
    return error
  }
}

const getGeoLocation = async(address) => {
    return geoCode(address)
        .then(response => {
            return response.data.results[0].geometry.location
        })
        .catch(error => {
            return error
        })
}

const distance = (origins, destinations) => {
  try {
    return axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
        params: {
          units: "imperial",
          origins,
          destinations,
          key: GOOGLE_KEY
        }
      });
  } catch (error) {
    return error
  }
}

const getDistance = async(origins, destinations) => {
  return distance(origins, destinations)
      .then(response => {
        return response.data.rows[0].elements[0].distance.value / 1609.344
      })
      .catch(error => {
          return error
      })
}

module.exports = {getGeoLocation, getDistance};
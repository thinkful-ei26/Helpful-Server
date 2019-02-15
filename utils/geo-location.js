const axios = require('axios');
const { GEO_KEY } = require("../config");

// key needs to be put in .env params
const geoCode = (address) => {
  try {
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address,
          key: GEO_KEY
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

module.exports = getGeoLocation;
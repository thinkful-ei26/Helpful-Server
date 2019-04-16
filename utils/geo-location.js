const axios = require("axios");
const { GOOGLE_KEY } = require("../config");

const geoCode = address => {
    try {
        return axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                address,
                key: GOOGLE_KEY,
            },
        });
    } catch (error) {
        return error;
    }
};

const getGeoLocation = async address => {
    return geoCode(address)
        .then(response => {
            return response.data.results[0].geometry.location;
        })
        .catch(error => {
            return error;
        });
};

const distance = (origins, destinations) => {
    try {
        return axios.get(
            "https://maps.googleapis.com/maps/api/distancematrix/json",
            {
                params: {
                    units: "imperial",
                    origins,
                    destinations,
                    key: GOOGLE_KEY,
                },
            }
        );
    } catch (error) {
        return error;
    }
};

const getDistance = async (origins, destinations) => {
    return distance(origins, destinations)
        .then(response => {
            return response.data.rows[0].elements[0].distance.value / 1609.344;
        })
        .catch(error => {
            return error;
        });
};

const validateAddress = async (AddressLine1, AddressLine2) => {
    try {
        return await axios
            .get("https://www.yaddress.net/api/address", {
                params: {
                    AddressLine1,
                    AddressLine2,
                },
            })
            .then(res => {
                const {
                    ErrorCode,
                    ErrorMessage,
                    Latitude,
                    Longitude,
                } = res.data;
                if (ErrorCode === 0) {
                    return { Latitude, Longitude };
                } else {
                    return ErrorMessage;
                }
            });
    } catch (err) {
        console.log(err);
    }
};

validateAddress("", "Scottsdale, Arizona");

module.exports = { getGeoLocation, getDistance, validateAddress };

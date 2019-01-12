const baseURL = "https://gtfsapi.metrarail.com";
const feedURL = "/gtfs/tripUpdates";
const axios = require("axios");
const btoa = require("btoa");
require("dotenv").config();

exports.handler = (event, context, callback) => {
  var basicAuth =
    "Basic " +
    btoa(process.env.METRA_ACCESS_KEY + ":" + process.env.METRA_SECRET_KEY);
  axios
    .get(`${baseURL}${feedURL}`, {
      headers: {
        "cache-control": "no-cache",
        Authorization: basicAuth
      }
    })
    .then(res => {
      callback(null, { statusCode: 200, body: JSON.stringify(res.data) });
    })
    .catch(err => {
      callback(err);
    });
};

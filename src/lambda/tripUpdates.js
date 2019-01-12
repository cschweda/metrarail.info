const axios = require("axios");
const btoa = require("btoa");
require("dotenv").config();

exports.handler = (event, context, callback) => {
  var basicAuth =
    "Basic " +
    btoa(process.env.METRA_ACCESS_KEY + ":" + process.env.METRA_SECRET_KEY);
  axios
    .get("https://gtfsapi.metrarail.com/gtfs/tripUpdates", {
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

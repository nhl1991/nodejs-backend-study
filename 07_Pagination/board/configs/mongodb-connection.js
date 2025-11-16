// process.env
require('dotenv').config({
  path: require("path").resolve(__dirname, "../../../.env"),
})


const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URL;

module.exports = function (callback) {
    return MongoClient.connect(uri, callback);
}
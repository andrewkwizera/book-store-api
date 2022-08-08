const mongoose = require("mongoose");
const config = require('../config/index')

function connectMongo() {
  mongoose
    .connect(config.mongoUri)
    .then((connection) => {
      console.log("connected to mongodb database");
    })
    .catch((error) => {
      console.log(`unable to connect to database: ${error.message}`);
    });
}
module.exports = { connectMongo };

const mongoose = require("mongoose");
const config = require('../config/index')
const logger = require('../config/logger')

function connectMongo() {
  mongoose
    .connect(config.mongoUri)
    .then((connection) => {
     logger.info("connected to mongodb database");
    })
    .catch((error) => {
     logger.info(`unable to connect to database: ${error.message}`);
    });
}
module.exports = { connectMongo };

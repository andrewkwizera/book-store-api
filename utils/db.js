const mongoose = require("mongoose");
require("dotenv").config();

function connectToDb() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((connection) => {
      console.log("connected to database");
    })
    .catch((error) => {
      console.log(`unable to connect to database: ${error.message}`);
    });
}
module.exports = { connectToDb };

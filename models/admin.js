const { Schema, model } = require("mongoose");
const AdminSchema = new Schema({
   firstname: {
      type: String, required: [true, ""]
   },
   lastname: {
      type: String, required: [true, ""]
   },
   email: {
      type: String,
      required: [true, ""],
   },
});
const Admins = model("Admin", AdminSchema);
module.exports = Admins;

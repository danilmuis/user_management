const mongoose = require("mongoose");

const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);

const tokenSchema = new Schema(
    {
      token: {
        type: String,
        required: true,
        unique : true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("tokens", tokenSchema);
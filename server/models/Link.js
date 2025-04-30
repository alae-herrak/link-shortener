const mongoose = require("mongoose");
const { Schema } = mongoose;

const linkSchema = new Schema({
  originalUrl: { type: String, required: true, unique: true },
  shortUrl: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Link = mongoose.model("Link", linkSchema);
module.exports = Link;

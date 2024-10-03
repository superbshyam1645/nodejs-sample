const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  details: { type: String, require: true },
  available: { type: Boolean, require: true },
  rating: { type: Number },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

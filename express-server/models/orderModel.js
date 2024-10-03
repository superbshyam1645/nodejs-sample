const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  name: { type: String, require: true },
  amount: { type: Number, require: true },
  purchasedate: { type: Date, require: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  name: { type: String, require: true },
  amount: { type: Number, require: true },
  purchasedate: { type: Date, require: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

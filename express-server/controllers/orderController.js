const mongoose = require("mongoose");
const Order = require("../models/orderModel");

exports.getAll = (req, res, next) => {
  Order.find({})
    .populate("user") // Populate user details
    .populate("product") // Populate product details
    .then((orders) => {
      res
        .status(200)
        .json({ message: "Available Orders fetched successfully", orders });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getOne = (req, res, next) => {
  Order.findById(req.params.id)
    .populate("user product") // Optional: to populate related User and Product data
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ message: `Order fetched successfully`, order });
    })
    .catch((error) => {
      next(error);
    });
};

exports.postOne = async (req, res, next) => {
  try {
    const { name, amount, purchasedate, user, product } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    if (product && !mongoose.Types.ObjectId.isValid(product)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const order = await Order.create({
      name,
      amount,
      purchasedate,
      user,
      product: product || null, // Optional product
    });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    next(error);
  }
};

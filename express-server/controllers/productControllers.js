const Product = require("../models/productModel");

exports.getAll = (req, res, next) => {
  Product.find({ available: 1 })
    .then((products) => {
      res
        .status(200)
        .json({ message: "Available products fetched successfully", products });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getOneById = (req, res, next) => {
  const productId = req.params.id;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res
        .status(200)
        .json({ message: "Product fetched successfully", product });
    })
    .catch((error) => {
      next(error);
    });
};

exports.postOne = (req, res, next) => {
  Product.create({
    name: req.body.name,
    price: req.body.price,
    details: req.body.details,
    available: req.body.available,
    rating: req.body.rating || null,
  })
    .then((product) => {
      res
        .status(201)
        .json({ message: "Product created successfully", product });
    })
    .catch((error) => {
      next(error);
    });
};

exports.updateOne = (req, res, next) => {
  const productId = req.params.id;
  const updatedData = {};

  if (req.body.name) updatedData.name = req.body.name;
  if (req.body.price) updatedData.price = req.body.price;
  if (req.body.details) updatedData.details = req.body.details;
  if (req.body.available !== undefined)
    updatedData.available = req.body.available;
  if (req.body.rating !== undefined) updatedData.rating = req.body.rating;

  Product.findByIdAndUpdate(productId, updatedData, { new: true })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res
        .status(200)
        .json({ message: "Product updated successfully", product });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteOne = (req, res, next) => {
  const productId = req.params.id;

  Product.findByIdAndDelete(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    })
    .catch((error) => {
      next(error);
    });
};

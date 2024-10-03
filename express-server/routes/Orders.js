const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router
  .get("/", orderController.getAll)
  .get("/:id", orderController.getOne)
  .post("/", orderController.postOne);

module.exports = router;

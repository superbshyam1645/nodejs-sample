const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authenticatedToken = require("../middleware/auth");

router
  .get("/all", authenticatedToken, orderController.getAll)
  .get("/:id", authenticatedToken, orderController.getOne)
  .post("/", authenticatedToken, orderController.postOne);

module.exports = router;

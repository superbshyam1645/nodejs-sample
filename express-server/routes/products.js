var express = require("express");
var router = express.Router();
var getAllController = require("../controllers/productControllers");
const authenticatedToken = require("../middleware/auth");

router
  .get("/", getAllController.getAll)
  .get("/:id", authenticatedToken, getAllController.getOneById)
  .post("/", authenticatedToken, getAllController.postOne)
  .put("/:id", authenticatedToken, getAllController.updateOne)
  .delete("/:id", authenticatedToken, getAllController.deleteOne);

module.exports = router;

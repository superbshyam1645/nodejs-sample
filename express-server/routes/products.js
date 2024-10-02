var express = require("express");
var router = express.Router();
var getAllController = require("../controllers/productControllers");

/* GET home page. */
router
  .get("/", getAllController.getAll)
  .get("/:id", getAllController.getOneById)
  .post("/post", getAllController.postOne)
  .put("/update/:id", getAllController.updateOne)
  .delete("/delete/:id", getAllController.deleteOne);

module.exports = router;

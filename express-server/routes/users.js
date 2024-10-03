var express = require("express");
var router = express.Router();
var userController = require("../controllers/userControllers");
var authenticatedToken = require("../middleware/auth");
router
  .post("/login", userController.getUser)
  .post("/register", userController.createUser)
  .put("/:id", authenticatedToken, userController.updateUser)
  .delete("/:id", authenticatedToken, userController.deleteUser);

module.exports = router;

var express = require("express");
var router = express.Router();
var userController = require("../controllers/userControllers");

router
  .get("/", userController.getUser)
  .post("/createuser", userController.createUser)
  .put("/updateuser/:id", userController.updateUser)
  .delete("/deleteuser/:id", userController.deleteUser);

module.exports = router;

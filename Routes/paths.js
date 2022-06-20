const express = require("express");
// const sigupController= require("../Controllers/employeeController");
// const LoginController= require("../Controllers/employeeLoginController");
// const AuthController= require("../Controllers/AuthrizeAdminEmployeeController");
// const FuncController = require("../Controllers/FunctionalController");
const mustBeLoggedIn = require("../Middleware/MustBeLoginMiddleware");
const router = express.Router();
const controllers=require("../Controllers/FunctionalController")

router.route("/Signup").post(controllers.test.registerEmployee);
router.route("/Login").post(controllers.test.LoginEmployee);
router
  .route("/GetAcessToAllRecord")
  .get(mustBeLoggedIn, controllers.test.GetAllEmployee);

module.exports = router;

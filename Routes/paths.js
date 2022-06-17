const express = require("express");
const sigupController= require("../Controllers/employeeController");
const LoginController= require("../Controllers/employeeLoginController");
const AuthController= require("../Controllers/AuthrizeAdminEmployeeController");
const  mustBeLoggedIn  = require("../Middleware/MustBeLoginMiddleware");
const router= express.Router();


router.route("/Signup").post(sigupController);
router.route("/Login").post(LoginController);
router.route("/GetAcessToAllRecord").get(mustBeLoggedIn,AuthController);

module.exports = router;
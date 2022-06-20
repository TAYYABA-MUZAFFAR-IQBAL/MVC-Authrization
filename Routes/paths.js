const express = require("express");
// const sigupController= require("../Controllers/employeeController");
// const LoginController= require("../Controllers/employeeLoginController");
// const AuthController= require("../Controllers/AuthrizeAdminEmployeeController");
// const controllers=require("../Controllers/ClassControllerApproch")
const Funccontroller=require("../Controllers/CRUDFunctionalController")
const mustBeLoggedIn = require("../Middleware/MustBeLoginMiddleware");
const router = express.Router();

//register new employee route
router.route("/Signup").post(Funccontroller.registerEmployee);
//login route
router.route("/Login").post(Funccontroller.LoginEmployee);
//get all employess rote
router
  .route("/GetAcessToAllRecord")
  .get(mustBeLoggedIn,Funccontroller.GetAllEmployee);
  //get employee by id route
router
  .route("/Get/:id")
  .get(mustBeLoggedIn,Funccontroller.GetEmployeeById);
  //update route 
  router
  .route("/Update/:id")
  .put(mustBeLoggedIn,Funccontroller.UpdateEmployee);
  //delete route
  router
  .route("/Delete/:id")
  .delete(mustBeLoggedIn,Funccontroller.DeleteEmployee);
  

module.exports = router;

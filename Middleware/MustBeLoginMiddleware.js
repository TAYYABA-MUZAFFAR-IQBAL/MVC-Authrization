const jwt = require("jsonwebtoken");
const EmpSchema= require("../Models/employeeMdel");


//middleware for authorization

const mustBeLoggedIn = async (req, res, next) => {
    let token =
      req.headers["x-access-token"] ||
      req.headers.authorization ||
      req.body.token;
    // Express headers are auto converted to lowercase
    if (token && token.startsWith("Bearer")) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    }
  
    try {
      //  we extract the JWTSECRET from the .env file
      req.apiUser = jwt.verify(token, process.env.TOKEN_KEY);
      res.locals.apiUser = req.apiUser; //decoded token
  
      const userbyemail = await EmpSchema.find({ email: req.apiUser.email });
      console.log(req.apiUser);
      console.log("userbyemail", userbyemail);
      
      //find role from extracted data from email
      const userRole = await EmpSchema.find({ role: req.apiUser.email });
      
      console.log("Req===>", req.apiUser);
      console.log( userbyemail[0].role);
      if (req.apiUser && (userbyemail[0].role === "Admin")) {
        console.log("Welcome Admin!! data extraxted successfully");
        next();
      } else {
        console.log("you have no access to all data");
        return res.status(403).json({
          status: false,
          message: "No access",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        status: false,
        message: "Sorry, you must provide a valid token.",
      });
    }
  };
  
  module.exports = mustBeLoggedIn;
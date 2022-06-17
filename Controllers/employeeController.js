const EmpSchema= require("../Models/employeeMdel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require("dotenv").config();

//register employee
const SignupEmployee= async(req,res)=>{
    try {
        // Get user input
        const { first_name, last_name, email, password,role } = req.body;
    
        // Validate user input
        if (!(email && password && first_name && last_name && role)) {
          res.status(400).send("All input is required");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldemployee = await EmpSchema.findOne({ email });
    
        if (oldemployee) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await EmpSchema.create({
          first_name,
          last_name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
          role
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
}
module.exports = SignupEmployee;

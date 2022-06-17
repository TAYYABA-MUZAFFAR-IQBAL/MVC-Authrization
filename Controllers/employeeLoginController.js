const EmpSchema= require("../Models/employeeMdel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require("dotenv").config();

//Login Employee
const LoginEmployee= async(req,res)=>{
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await EmpSchema.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { email: email },
            process.env.TOKEN_KEY,
            {
                expiresIn: 864000 ,
            }
            
          );
            // user
         return res.status(200).json({status: true, token: token});
          
        }
        res.status(400).json("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
}

module.exports = LoginEmployee;

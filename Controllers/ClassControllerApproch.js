const EmpSchema = require("../Models/employeeMdel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

class test {
     //register Employee
    registerEmployee = async (req, res) => {
        try {
          // Get user input
          const { first_name, last_name, email, password, role } = req.body;
    
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
         const encryptedPassword = await bcrypt.hash(password, 10);
    
          // Create user in our database
          const user = await EmpSchema.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            role,
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
      };

      
  //Login Employee
 LoginEmployee = async (req, res) => {
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
        const token = jwt.sign({ email: email }, process.env.TOKEN_KEY, {
          expiresIn: 864000,
        });
        // user
        return res.status(200).json({ status: true, token: token });
      }
      res.status(400).json("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  };

  //Get All By Admin Only Logic
  GetAllEmployee = async (req, res) => {
    EmpSchema.find({}, (err, users) => {
      if (err) {
        console.log("you have no access");
        res.status(500).json({ errmsg: err });
        return;
      } else {
        console.log("users", users);

        res.status(200).json({ msg: users });
        console.log("All user data is extracted");
      }
    });
  };

}
module.exports.test= new test;
 



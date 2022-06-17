const EmpSchema= require("../Models/employeeMdel");


//Authorize Admin to get All Data 
const AdminGetRecord= (async (req,res)=>{

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
      })
});

module.exports = AdminGetRecord;
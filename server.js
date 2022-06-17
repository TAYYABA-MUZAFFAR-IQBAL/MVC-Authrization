const express = require("express");
// const mongoose = require("mongoose");
const DB= require("./Config/Database");
const PathOfRegisterEmployee= require("./Routes/paths");
const { API_PORT } = process.env;


const app = express();



//SERVER CONNECTION
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//BODY PARSER 
app.use(express.json())

//USE ROUTES PATHS
app.use("/EmployeeDB",PathOfRegisterEmployee);




module.exports = app;
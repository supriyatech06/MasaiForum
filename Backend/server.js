const express = require('express');
const {connection}=require("./db");
const { userRouter } = require('./Routes/Userroutes');
const {postRouter} = require("./Routes/Postroutes")


const app = express();
app.use(express.json())
app.use("/users",userRouter)
app.use("/posts",postRouter)

// Middleware
// app.use(express.json());





// Start the server

app.listen(8080,async() => {
  // console.log(`Server is running on port ${8080}`);
 try {
  await connection
  console.log("connected db")
   console.log(`Server is running on port ${8080}`);
 } catch (error) {
  console.log(error)
 }
});

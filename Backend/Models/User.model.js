// // user.model.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: "default_avatar_url_here"
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = {UserModel};



// const mongoose=require("mongoose")
// const userSchema=mongoose.Schema({
//     username:String,
//     email:String,
//     pass:String,
// },{
// versionKey:false
// })

// const UserModel=mongoose.model("user",userSchema)

// module.exports={
//     UserModel
// }
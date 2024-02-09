// const jwt = require('jsonwebtoken');
// const { BlackListModel } = require("../Models/Blacklistmodel");
// require('dotenv').config();

// const authMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1] || null;

//   try {
//     if (!token) {
//       return res.status(400).send({ msg: 'Please Login first!!' });
//     }

//     // const tokenInBlackList = await BlackListModel.findOne({ blackList: { $in: token } });

//     // if (tokenInBlackList) {
//     //   return res.status(400).send({ msg: 'Please Login !!' });
//     // }

//     jwt.verify(token,process.env.KEY, (err, decoded) => {
      
//       if(decoded){
//         req.body.userID=decoded.userID
//         req.body.username=decoded.username
//         next();
//       }
//       else{
//         return res.status(401).send({ msg: 'Please Login!!' }); // Change status to 401 Unauthorized
//       }
      
//     });
//   } catch (error) {
//     return res.status(400).send({ error: error.message });
//   }
// };

// module.exports = authMiddleware;



// authMiddleware.js

const jwt = require('jsonwebtoken');
const { UserModel } = require("../Models/User.model"); // Import the User model

require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || null;

  try {
    if (!token) {
      return res.status(400).send({ msg: 'Please Login first!!' });
    }

    jwt.verify(token, process.env.KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ msg: 'Please Login!!' });
      }
      
      // Retrieve the user ID from the decoded token
      const userId = decoded.userID;

      // Attach the user ID to the request object
      req.userId = userId;

      next();
    });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports = authMiddleware;

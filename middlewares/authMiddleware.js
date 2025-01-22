const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authenticate = async (req, res, next) =>{
  const token = req.header('auth-token');
  if(!token){
    return res.status(401).json({message: "Access Denied. No token provided"});
  }
  try{
    const decoded = jwt.verify(token, 'phaserunner03');
    req.user = await User.findById(decoded.id);
    if(!req.user){
      return res.status(401).json({
        message: "Invalid token"
      });
    }
    next();
  }
  catch(err){
    res.status(401).json({message: "Invalid token"});
  }
};

module.exports ={authenticate};
  
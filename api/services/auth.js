const jwtServices = require('./jwtservice')
const User = require('../models/user');
const genRes = require("./genre")

module.exports = async function (req, res, next) {
  
    var token = req.headers.authorization;
    if (token) {
        await jwtServices.verifyJwtToken(token, async function (err, decoded) {
            if (err) {
                return res.send(genRes.generateResponse(false, "Invalid Authorization", 401, null));
            } else {
          
              const email= decoded.email;
            
              const user = await User.findOne({email:email})
              if(!user){
                return res.send(genRes.generateResponse(false, "Invalid Authorization", 401, null))
              }
           
              req.user= user;
                next();
            }
        })
    } else {
        return res.send(genRes.generateResponse(false, "Invalid Authorization", 401, null));
    }
}
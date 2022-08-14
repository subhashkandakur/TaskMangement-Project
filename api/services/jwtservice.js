const jwt = require("jsonwebtoken");

module.exports = {
  generateAccessToken(payload) {
    return jwt.sign(payload, process.env.TOKEN_SECRET);
  },
  verifyJwtToken(token, cb) {
    return jwt.verify(token, process.env.TOKEN_SECRET, {}, cb);
  },
  generateRefreshToken(payload){
      return jwt.sign(payload, process.env.REFRESHTOKEN_SECRET);
  }
};

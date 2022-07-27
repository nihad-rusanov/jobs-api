const { unauthenticated } = require("../errors");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer:")) {
    throw new unauthenticated("Authentication valid1");
  }
  const token = authHeader.split(" ")[1];

  try {
    console.log(token);
    const payload = jwt.verify(token, "NeverGiveUp");

    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (err) {
    throw new unauthenticated("Authentication valid2");
  }
};
//({userId:this._id,name:this.name},"NeverGiveUp",{
module.exports = auth;

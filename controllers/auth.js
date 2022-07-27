const { unauthenticated } = require("../errors");
const User = require("../model/User");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });
  const token = user.createToken();
  res.status(201).json({
    user: { name: user.name, password: user.password },
    token: token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!email) {
    throw new unauthenticated("invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new unauthenticated("invalid credentials");
  }

  const token = user.createToken();

  res.status(200).json({
    user: { name: user.name },
    token,
  });
};

module.exports = {
  register,
  login,
};

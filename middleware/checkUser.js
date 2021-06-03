const User = require("../models/User");

exports.checkUser = async (req, res, next) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  res.locals.user = user;
  next();
};

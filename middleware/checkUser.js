const User = require("../models/User");

exports.checkUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.locals.user = user;
  next();
};

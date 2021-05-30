const User = require("../models/User");

exports.getIndex = (req, res) => {
  res.render("index");
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.getSignup = (req, res) => {
  res.render("signup");
};

exports.postSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json({ success: true, user: user });
  } catch (err) {
    res.status(400).send(err.errors);
  }
};

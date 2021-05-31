const User = require("../models/User");
const errorHandle = require("../middleware/errorHandle");

exports.getIndex = (req, res) => {
  res.render("index");
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.getSignup = (req, res) => {
  res.render("signup");
};

exports.getDashboard = (req, res) => {
  res.render("dashboard");
};

exports.postSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json({ success: true, user: user });
  } catch (err) {
    const errors = errorHandle(err);
    res.status(400).json({ success: false, errors });
  }
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.status(200).json({ success: true, user: user._id });
  } catch (err) {
    const errors = errorHandle(err);
    res.status(400).json({ success: false, errors });
  }
};

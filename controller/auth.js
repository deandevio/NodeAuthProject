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

exports.getDashboard = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      throw Error(`${req.params.username} doesn't exist in our database`);
    }
    res.render("dashboard");
  } catch (err) {
    console.log(err);
    const error = errorHandle(err);
    res.status(400).json({ success: false, error: error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.postSignup = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.create({ username, email, password });
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
    req.session.isAuth = true;
    res.status(200).json({ success: true, user: user.username });
  } catch (err) {
    const errors = errorHandle(err);
    res.status(400).json({ success: false, errors });
  }
};

exports.logoutPost = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
};

exports.deleteUser = async (req, res) => {
  try {
    const { username } = req.params.username;
    const user = await User.findOneAndDelete({ username });
    if (user) {
      res.status(200).json({ success: true, message: `The user ${user.email} with the id ${user._id} is deleted` });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteAllUsers = async (req, res) => {
  try {
    const users = await User.deleteMany();
    res.status(200).json({ success: true, deleted: users });
  } catch (err) {
    console.log(err);
  }
};

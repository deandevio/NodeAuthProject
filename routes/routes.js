const express = require("express");
const router = express.Router();
const { getLogin, getSignup, getIndex, postSignup, getDashboard, postLogin, logoutPost, getUsers, deleteUser } = require("../controller/auth");
const { isAuth } = require("../middleware/isAuth");
const { checkUser } = require("../middleware/checkUser");

router.route("/").get(getIndex);
router.route("/signup").get(getSignup).post(postSignup);
router.route("/login").get(getLogin).post(postLogin);
router.route("/logout").post(logoutPost);
router.route("/users").get(getUsers);
router.route("/:username").get(checkUser, isAuth, getDashboard).delete(checkUser, deleteUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const { getLogin, getSignup, getIndex, postSignup, getDashboard, postLogin, logoutPost } = require("../controller/auth");
const { isAuth } = require("../middleware/isAuth");

router.route("/").get(getIndex);
router.route("/dashboard").get(isAuth, getDashboard);
router.route("/signup").get(getSignup).post(postSignup);
router.route("/login").get(getLogin).post(postLogin);
router.route("/logout").post(logoutPost);

module.exports = router;

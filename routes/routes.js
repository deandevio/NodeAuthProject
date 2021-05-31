const express = require("express");
const router = express.Router();
const { getLogin, getSignup, getIndex, postSignup, getDashboard, postLogin } = require("../controller/auth");

router.route("/").get(getIndex);
router.route("/dashboard").get(getDashboard);
router.route("/signup").get(getSignup).post(postSignup);
router.route("/login").get(getLogin).post(postLogin);

module.exports = router;

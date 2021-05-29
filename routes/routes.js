const express = require("express");
const router = express.Router();
const { getLogin, getSignup, getIndex, postSignup } = require("../controller/auth");

router.route("/").get(getIndex);
router.route("/signup").get(getSignup).post(postSignup);
router.route("/login").get(getLogin);

module.exports = router;

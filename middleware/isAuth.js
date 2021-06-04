exports.isAuth = (req, res, next) => {
  req.session.isAuth ? next() : res.redirect("/login");
};

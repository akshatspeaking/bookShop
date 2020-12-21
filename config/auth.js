module.exports = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    req.flash("error", "Unauthorized. Please Login as Admin to perform this action");
    res.redirect("/users/login")
  }
}
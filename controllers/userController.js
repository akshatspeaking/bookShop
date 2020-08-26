const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");
var jwt = require("jsonwebtoken");

module.exports = {
  getLoginPage: (req, res) => {
    let flashmsg = req.flash("warn")[0];
    res.render("login", { flashmsg });
  },
  emailLogin: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((data) => {
        if (!data) {
          console.log("No such user");
          req.flash("warn", "Email not registered!");
          res.redirect("/users/login");
        } else if (data) {
          if (data.verifyPassword(req.body.password)) {
            // req.session.passport.user = data.id;
            res.locals.user = data;
            console.log("User Logged in successully!", res.locals.user);
            res.redirect("/");
          } else if (!data.verifyPassword(req.body.password)) {
            req.flash("warn", "Incorrect Password!");
            console.log("Incorrect Pwd");
            res.redirect("/users/login");
          }
        }
      })
      .catch((err) => {
        req.flash("warn", "DB Error");

        console.log(err, "DB Error");
        res.redirect("/users/login");
      });
  },
  googleLogin: (req, res) => {
    res.send(" Google LoggingIn");
  },
  getRegisterPage: (req, res) => {},
  verifyEmail: (req, res) => {},
  addAddress: (req, res) => {},
  deleteAddress: (req, res) => {},
  editAddress: (req, res) => {},
  viewOrders: (req, res) => {},
  viewWishlist: (req, res) => {},
  logoutUser: (req, res) => {},
};

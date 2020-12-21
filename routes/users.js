var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
const User = require("../models/User");

// const localStrategy = require("passport-local").Strategy;
var passport = require("passport");

var setRedirect = require("../config/setRedirect");
const { session } = require("passport");

/* GET users listing. */
router.get("/login", setRedirect, userController.getLoginPage);
router.post("/cart/checkout", userController.checkoutCart);
router.get("/cart", userController.viewCart);

router.post(
  "/login", 
    passport.authenticate("local", {
      // successRedirect: req.redirectTo || "/",
      failureRedirect: "/users/login",
      failureFlash: true,
      successFlash: true,
    }),
    userController.emailLogin
);

router.post("/register", userController.registerUser);




router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/users/login",
    }) 
    ,userController.googleLogin
);

router.get(
  "/auth/google", 
  passport.authenticate("google", {
    scope: ["profile", "email"],
    })
);


router.get(
  "/logout", setRedirect, userController.logoutUser
);

router.get("/verify/:hash", userController.verifyEmail)


module.exports = router;

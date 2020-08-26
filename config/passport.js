var passport = require("passport");
var mongoose = require("./mongoose");
var User = mongoose.models.User;
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth2").Strategy;

// var JWTstrategy = require("passport-jwt").Strategy;
// var ExtractJWT = require("passport-jwt").ExtractJwt;

exports.google = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.googleid,
        clientSecret: process.env.googlesecret,
        callbackURL: "http://yourdormain:3000/auth/google/callback",
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    )
  );
};

exports.local = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "user[email]",
        passwordField: "user[password]",
        session: false,
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          console.log(user, "HERE");
          if (!user) {
            console.log("NO USER FOUND");
            return done({ message: "User not found", status: 420 });
          }
          //Validate password and make sure it matches with the corresponding hash stored in the database
          //If the passwords match, it returns a value of true.
          const validate = user.verifyPassword(password);
          if (!validate) {
            console.log("WRONG PASSWORD");
            // return res.status(422).json({ error: "Incorrect Password" });
            return done({ message: "Wrong Password", status: 420 });
          }
          return done(null, user, { message: "Logged in Successfully" });
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );
};

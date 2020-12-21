var passport = require("passport");
var mongoose = require("./mongoose");
var User = mongoose.models.User;
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleclientid,
      clientSecret: process.env.googleclientsecret,
      callbackURL: "http://localhost:3001/users/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        // console.log(profile);
        let user = await User.findOne({
          email: profile.email,
        });
        if (user) {
          return done(null, user);
        } else if (!user) {
          let newUser = await User.create({
            googleId: profile.id,
            email: profile.email,
          });
          return done(null, newUser);
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: true,
    },
    async (email, password, done) => {
      try {
    console.log("HERE");
        
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found"});
        }
        const validate = user.verifyPassword(password);
        if (!validate) {
          return done(null, false, { message: "Wrong Password"});
        }
        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

const passport = require("passport");
const User = require("../models/user.models");
const sendEmail = require("../utils/email/sendEmail");
const GoogleStrategy = require("passport-google-oidc").Strategy;

require("dotenv").config();

passport.serializeUser((user, done) => {
  console.log(`serializeUser`);
  console.log(user);
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  console.log(`deserializeUser`);
  console.log(id);
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/v1/auth/redirect/google",
    },
    async (issuer, profile, done) => {
      const email = profile.emails[0].value;
      const userExist = await User.findOne({ email });
      if (userExist) {
        return done(null, userExist);
      } else {
        const newUser = await User.create({
          email,
          firstName: profile.displayName.split(" ")[0]
            ? profile.displayName.split(" ")[0]
            : "unknown",
          lastName: profile.displayName.split(" ")[1]
            ? profile.displayName.split(" ")[1]
            : "unknown",
        });
        sendEmail(
          email,
          "Gift shop",
          {
            name: "haile",
          },
          "./template/wellcome.handlebars"
        );
        return done(null, newUser);
      }
    }
  )
);

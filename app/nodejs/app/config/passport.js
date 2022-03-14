const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Op } = require('@sequelize/core');
const db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we
// want login with a username/email and password
passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email",
    },
    // this is the function that passport runs when calling
    // passport.authenticate(), the done() function is built into
    // passport.  If the user is authenticated, done() will attach
    // the user to the request object and then call the next function
    // in the login route: (req, res) => { res.json(req.user) },
    // and passing the request along with the user attached

    (email, password, done) => {
      // When a user tries to sign in this code runs
      db.user.findOne({
        where: {
          [Op.or]: [
            { email },
            { username: email }
          ]
        },
      }).then((dbUser) => {
        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "E-mail ou nom d'utilisateur incorrect.",
          });
        }
        // If there is a user with the given email, but the password
        // the user gives us is incorrect
        if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Mot de passe incorrect.",
          });
        }
        // If none of the above, call the done function
        // and pass the user
        return done(null, dbUser, { message: 'Connecté avec succès' });
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;

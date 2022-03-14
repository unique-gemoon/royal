const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const config = require("./auth.config");
const db = require("../models");
const User = db.user;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secret,
    },
    function (jwtPayload, done) {
      return User.findByPk(jwtPayload.sub)
        .then((user) => {
          return done(null, {user : {id: user.id, username : user.username,email : user.email}});
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

import express from "express";
import session from "express-session";
import expressListRoutes from "express-list-routes";
import morgan from "morgan";
import passport from "passport";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./app/models/index.model.js";
import router from "./app/routes/index.routes.js";
import { Strategy, ExtractJwt } from "passport-jwt";

const User = db.user;

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    function (jwtPayload, done) {
      return User.findByPk(jwtPayload.sub)
        .then((user) => {
          if(!user){return done('user not existe');}
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

const app = express();
const PORT = process.env.NODE_DOCKER_PORT;

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
};

app.use(cors(corsOptions));

// Express boilerplate middleware
// =============================================
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session middleware
// =============================================
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routing
// =============================================
app.use("/api", router);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to royalis application." });
});

//show all routes
console.log("*************************************\n");
expressListRoutes(router);
console.log("\n*************************************\n");

// Sync sequelize models then start Express app
// =============================================
app.listen(PORT, () => {
  console.log("\n*************************************\n");
  console.log(`App listening on PORT ${PORT}`);
});

db.sequelize.sync().then(() => {
  console.log(`${process.env.DB_NAME} database connected`);
  console.log("*************************************\n");
});

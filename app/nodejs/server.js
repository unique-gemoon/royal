const express = require("express");
const session = require("express-session");
const expressListRoutes = require("express-list-routes");
const logger = require("morgan");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const routes = require("./app/routes");
const config = require("./app/config/auth.config");
require('./app/config/passport')

const app = express();
const PORT = process.env.NODE_DOCKER_PORT;

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
};

app.use(cors(corsOptions));

// Express boilerplate middleware
// =============================================
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session middleware
// =============================================
app.use(
  session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routing
// =============================================
app.use("/api", routes);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to royalis application." });
});

//show all routes
console.log("*************************************\n");
expressListRoutes(routes);
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

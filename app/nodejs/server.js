const express = require("express");
const session = require("express-session");
const expressListRoutes = require("express-list-routes");
const path = require("path");
const logger = require("morgan");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const routes = require("./app/routes");

const app = express();
const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:8086'
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
  session({ secret: "lk46v6qbT36s85rZEj7S7gXUHta6LC", resave: true, saveUninitialized: true })
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
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("\n*************************************");
    console.log(`${process.env.DB_NAME} database connected`);
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on PORT ${PORT}`);
      console.log("*************************************\n");
    });
  });

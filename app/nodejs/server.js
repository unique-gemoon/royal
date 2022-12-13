import config from "platformsh-config";
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
import { createServer } from "http";
import { Server } from "socket.io";
import { arrayRemove, countPlisOpened } from "./app/middleware/functions.js";

const platform = config.config();
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
                    if (!user) {
                        res.status(400).json({ message: "l'utilisateur n'existe pas" });
                        return;
                    } else {
                        return done(null, user);
                    }
                })
                .catch((err) => {
                    return done(err);
                });
        }
    )
);

const app = express();
const PORT = process.env.NODE_ENV == "production" && platform && platform.port ? platform.port : process.env.NODE_DOCKER_PORT;

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
/* app.listen(PORT, () => {
  console.log("\n*************************************\n");
  console.log(`App listening on PORT ${PORT}`);
}); */

db.sequelize.sync({ alter: true }).then(() => {
    console.log(`${process.env.DB_NAME} database connected`);
    console.log("*************************************\n");
});

// Socket io
// =============================================
const httpServer = createServer(app);
const options = { cors: corsOptions };
const io = new Server(httpServer, options);

httpServer.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

let usersConnected = [];
let plisOpened = [];

io.on("connection", (socket) => {
    socket.on("CLIENT_PLI", (data) => {
        io.emit("SERVER_PLI", data);
    });

    socket.on("CLIENT_SUBSCRIBER_UPDATED", (data) => {
        io.emit("SERVER_SUBSCRIBER_UPDATED", data);
    });

    socket.on("CLIENT_COMMENT", (data) => {
        io.emit("SERVER_COMMENT", data);
    });

    socket.on("CLIENT_TYPING_CITATION", (data) => {
        io.emit("SERVER_TYPING_CITATION", data);
    });

    socket.on("CLIENT_CITATION", (data) => {
        io.emit("SERVER_CITATION", data);
    });

    socket.on("CLIENT_MESSAGE", (data) => {
        io.emit("SERVER_MESSAGE", data);
    });

    socket.on("CLIENT_MESSAGE_SEEN", (data) => {
        io.emit("SERVER_MESSAGE_SEEN", data);
    });

    socket.on("CLIENT_THREAD", (data) => {
        io.emit("SERVER_THREAD", data);
    });

    socket.on("CLIENT_TYPING_MESSAGE", (data) => {
        io.emit("SERVER_TYPING_MESSAGE", data);
    });

    socket.on("CLIENT_OPEN_PLI", (data) => {
        if (data.id != undefined && data.opened != undefined && socket.handshake?.query?.key) {
            if (data.id) {
                const keyUser = socket.handshake.query.key;
                let existe = false;
                for (let i = 0; i < plisOpened.length; i++) {
                    if (plisOpened[i].id == data.id) {
                        if (data.opened) {
                            if (!plisOpened[i].users.includes(keyUser)) {
                                plisOpened[i].users.push(keyUser);
                            }
                        } else {
                            if (plisOpened[i].users.includes(keyUser)) {
                                plisOpened[i].users = arrayRemove(plisOpened[i].users, keyUser);
                            }
                        }
                        existe = true;
                    }
                }
                if (!existe && data.opened && data.id) {
                    plisOpened.push({ id: data.id, users: [keyUser] });
                }
            }
            io.emit("SERVER_OPEN_PLI", countPlisOpened(plisOpened));
        }
    });

    socket.on("disconnect", function () {
        if (socket.handshake?.query?.key) {
            const keyUser = socket.handshake.query.key;

            if (usersConnected.includes(keyUser)) {
                usersConnected = arrayRemove(usersConnected, keyUser);
            }
            io.emit("SERVER_COUNT_CONNECTION", {
                countConnection: usersConnected.length,
            });

            for (let i = 0; i < plisOpened.length; i++) {
                if (plisOpened[i].users.includes(keyUser)) {
                    plisOpened[i].users = arrayRemove(plisOpened[i].users, keyUser);
                }
            }
            io.emit("SERVER_OPEN_PLI", countPlisOpened(plisOpened));

            io.emit("SERVER_TYPING_CITATION", {});

            io.emit("SERVER_TYPING_MESSAGE", {});
        }
    });
});

io.on("connect", function (socket) {
    if (socket.handshake?.query?.key) {
        if (!usersConnected.includes(socket.handshake.query.key)) {
            usersConnected.push(socket.handshake.query.key);
        }
        
        setTimeout(()=>{io.emit("SERVER_COUNT_CONNECTION", {
            countConnection: usersConnected.length,
        });}, 500);
    }
});

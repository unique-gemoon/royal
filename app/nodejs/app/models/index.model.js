import config from "platformsh-config";
import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";
import user from "./user.model.js";
import pli from "./pli.model.js";
import media from "./media.model.js";
import sondageOptions from "./sondageOptions.model.js";
import sondageVotes from "./sondageVotes.model.js";
import appearancePli from "./appearancePli.model.js";
import sondageNotVotes from "./sondageNotVotes.model.js";
import subscriber from "./subscriber.model.js";
import comment from "./comment.model.js";
import thread from './thread.model.js';
import threadUsers from './threadUsers.model.js';
import message from './message.model.js'; 
import subscriberNotifications from './subscriberNotifications.model.js'; 
import commentNotifications from './commentNotifications.model.js'; 
import pliNotifications from './pliNotifications.model.js'; 
import citation from './citation.model.js';

const platform = config.config();

let db = {};
let credentials = {};

if (platform.hasRelationship('database') && process.env.NODE_ENV=="production") {
  credentials = platform.credentials('database');
}

const sequelize = new Sequelize(
  credentials && credentials.path ? credentials.path : process.env.DB_NAME,
  credentials && credentials.username ? credentials.username : process.env.DB_USER,
  credentials  && credentials.password ? credentials.password : process.env.DB_PASSWORD,
  {
    host:  process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4",
    },
    port: credentials && credentials.port ? credentials.port : process.env.DB_PORT,
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

db.user = user(sequelize, Sequelize);
db.pli = pli(sequelize, Sequelize);
db.media = media(sequelize, Sequelize);
db.sondageOptions = sondageOptions(sequelize, Sequelize);
db.sondageVotes = sondageVotes(sequelize, Sequelize);
db.appearancePli = appearancePli(sequelize, Sequelize);
db.sondageNotVotes = sondageNotVotes(sequelize, Sequelize);
db.subscriber = subscriber(sequelize, Sequelize);

db.comment = comment(sequelize, Sequelize);
db.thread = thread(sequelize, Sequelize);
db.threadUsers = threadUsers(sequelize, Sequelize);
db.message = message(sequelize, Sequelize); 
db.subscriberNotifications = subscriberNotifications(sequelize, Sequelize); 
db.commentNotifications = commentNotifications(sequelize, Sequelize); 
db.pliNotifications = pliNotifications(sequelize, Sequelize); 
db.citation = citation(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

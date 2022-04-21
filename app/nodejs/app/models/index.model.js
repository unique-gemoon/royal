import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";
import user from "./user.model.js";
import pli from './pli.model.js';
import media from './media.model.js';
import sondageOptions from "./sondageOptions.model.js";
import appearancePli from "./appearancePli.model.js";

let db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
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
db.appearancePli = appearancePli(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

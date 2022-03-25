import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";
import userModel from "./user.model.js";
import pliModel from './pli.model.js';
import mediaModel from './media.model.js';
import sondageOptionsModel from "./sondageOptions.model.js";
import appearancePliModel from "./appearancePli.model.js";

const db = {};

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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = userModel(sequelize, Sequelize);
db.pli = pliModel(sequelize, Sequelize);
db.media = mediaModel(sequelize, Sequelize);
db.sondageOptions = sondageOptionsModel(sequelize, Sequelize);
db.appearancePliModel = appearancePliModel(sequelize, Sequelize);

db.user.hasMany(db.pli);
db.pli.belongsTo(db.user, {foreignKey: 'userId'});

db.pli.hasMany(db.media);
db.media.belongsTo(db.pli);

db.media.hasMany(db.sondageOptions, {foreignKey: 'mediaId'});
db.sondageOptions.belongsTo(db.media, {foreignKey: 'mediaId'});

db.sondageOptions.belongsToMany(db.user, { through: 'sondageVotes' });
db.user.belongsToMany(db.sondageOptions, { through: 'sondageVotes' });

db.pli.belongsToMany(db.user, { through: db.appearancePliModel });
db.user.belongsToMany(db.pli, { through: db.appearancePliModel });


export default db;

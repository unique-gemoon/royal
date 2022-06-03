export default function pli(sequelize, Sequelize) {
  const Pli = sequelize.define("pli", {
    content: {
      type: Sequelize.TEXT,
      allowNull: true,
    },

    ouverture: {
      type: Sequelize.TEXT,
      allowNull: true,
    },

    duration: {
      type: Sequelize.TIME,
      notEmpty: true,
    },

    allottedTime: {
      type: Sequelize.INTEGER,
      notEmpty: true,
    },

    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
      onDelete: "cascade",
    },
  });

  Pli.associate = function (models) {
    Pli.hasMany(models.media);
    Pli.belongsTo(models.user, { foreignKey: "userId" });
    Pli.hasMany(models.appearancePli);
    Pli.hasMany(models.comment);
    Pli.hasMany(models.citation);
    Pli.hasMany(models.commentNotifications);
    Pli.hasMany(models.pliNotifications); 
  };

  return Pli;
}

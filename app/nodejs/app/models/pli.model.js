export default function pli(sequelize, Sequelize) {
  const Pli = sequelize.define("pli", {
    content: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    ouverture: {
      type: Sequelize.TEXT,
      allowNull: true,
    },

    duration: {
      type: Sequelize.TIME,
      allowNull: true,
    },

    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },

  });

  Pli.associate = function (models) {
    Pli.hasMany(models.media, { foreignKey: "pliId" });

    Pli.belongsTo(models.user, { foreignKey: "userId" });

    Pli.belongsToMany(models.user, { through: models.appearancePli });
  };
  
  return Pli;
}

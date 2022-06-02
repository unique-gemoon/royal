export default function citation(sequelize, Sequelize) {
  const Citation = sequelize.define("citation", {
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    pliId: {
      type: Sequelize.INTEGER,
      references: {
        model: "plis",
        key: "id",
      },
      allowNull: false,
      onDelete: "cascade",
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
    ancestryId: {
      type: Sequelize.INTEGER,
      references: {
        model: "citations",
        key: "id",
      },
      allowNull: true,
      onDelete: "cascade",
    },
  });

  Citation.associate = function (models) {
    Citation.belongsTo(models.pli, { foreignKey: "pliId" });
    Citation.belongsTo(models.user, { foreignKey: "userId" });
    Citation.belongsTo(models.citation, { foreignKey: "ancestryId" });
  };

  return Citation;
}

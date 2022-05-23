export default function pliNotifications(sequelize, Sequelize) {
  const PliNotifications = sequelize.define("pliNotifications", {
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
      onDelete: "cascade",
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
  });

  PliNotifications.associate = function (models) {
    PliNotifications.belongsTo(models.user, { foreignKey: "userId" });
    PliNotifications.belongsTo(models.pli, { foreignKey: "pliId" });
  };

  return PliNotifications;
}

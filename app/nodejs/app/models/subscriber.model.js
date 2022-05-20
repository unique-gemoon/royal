export default function subscriber(sequelize, Sequelize) {
  const Subscriber = sequelize.define("subscriber", {
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
      onDelete: "cascade",
    },
    subscriberId: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
      onDelete: "cascade",
    },
  });

  Subscriber.associate = function (models) {
    Subscriber.belongsTo(models.user, { foreignKey: "userId" });
    Subscriber.belongsTo(models.user, { foreignKey: "subscriberId" });
  };

  return Subscriber;
}

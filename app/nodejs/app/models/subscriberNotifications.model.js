export default function subscriberNotifications(sequelize, Sequelize) {
  const SubscriberNotifications = sequelize.define("subscriberNotifications", {
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

  SubscriberNotifications.associate = function (models) {
    SubscriberNotifications.belongsTo(models.user, { foreignKey: "userId" });
    SubscriberNotifications.belongsTo(models.subscriber, { foreignKey: "subscriberId" });
  };

  return SubscriberNotifications;
}

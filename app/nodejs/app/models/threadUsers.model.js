export default function threadUsers(sequelize, Sequelize) {
  const ThreadUsers =  sequelize.define("threadUsers", {
    threadId: {
      type: Sequelize.INTEGER,
      references: {
        model: "threads",
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
  });

  ThreadUsers.associate = function (models) {
    ThreadUsers.belongsTo(models.thread, { foreignKey: "threadId" });
    ThreadUsers.belongsTo(models.user, { foreignKey: "userId" });
  };

  return ThreadUsers;
}

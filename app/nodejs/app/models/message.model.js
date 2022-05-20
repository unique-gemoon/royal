export default function message(sequelize, Sequelize) {
  const Message = sequelize.define("message", {
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
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
    seen: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  Message.associate = function (models) {
    Message.belongsTo(models.thread, { foreignKey: "threadId" });
    Message.belongsTo(models.user, { foreignKey: "userId" });
  };

  return Message;
}

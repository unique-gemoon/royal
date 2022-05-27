export default function commentNotifications(sequelize, Sequelize) {
  const CommentNotifications = sequelize.define("commentNotifications", {
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
    commentId: {
      type: Sequelize.INTEGER,
      references: {
        model: "comments",
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

  CommentNotifications.associate = function (models) {
    CommentNotifications.belongsTo(models.user, { foreignKey: "userId" });
    CommentNotifications.belongsTo(models.comment, { foreignKey: "commentId" });
    CommentNotifications.belongsTo(models.pli, { foreignKey: "pliId" });
  };

  return CommentNotifications;
}

export default function comment(sequelize, Sequelize) {
  const Comment = sequelize.define("comment", {
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
    intendedUserId: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
      onDelete: "cascade",
    },
    parentId: {
      type: Sequelize.INTEGER,
      references: {
        model: "comments",
        key: "id",
      },
      allowNull: true,
      onDelete: "cascade",
    },
  });

  Comment.associate = function (models) {
    Comment.belongsTo(models.pli, { foreignKey: "pliId" });
    Comment.belongsTo(models.user, { foreignKey: "userId" });
    Comment.belongsTo(models.user, { foreignKey: "intendedUserId" });
    Comment.belongsTo(models.comment, { foreignKey: "parentId" });
    Comment.hasMany(models.commentNotifications); 
  };

  return Comment;
}

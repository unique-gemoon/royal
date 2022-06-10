export default function thread(sequelize, Sequelize) {
  const Thread = sequelize.define("thread", {
    blocked: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    blockedBy: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: true,
      onDelete: "cascade",
    },
  });

  Thread.associate = function (models) {
    Thread.hasMany(models.threadUsers);
    Thread.hasMany(models.message);
    Thread.belongsTo(models.user, { foreignKey: "blockedBy" });
  };

  return Thread;
}

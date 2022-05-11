export default function appearancePli(sequelize, Sequelize) {
  const AppearancePli = sequelize.define("appearancePli", {
    duration: {
      type: Sequelize.TIME,
      notEmpty: true,
    },

    allottedTime: {
      type: Sequelize.INTEGER,
      notEmpty: true,
    },

    signe: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    pliId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'plis',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'cascade',
    },

    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'cascade',
    },
  });

  AppearancePli.associate = function(models) {
    AppearancePli.belongsTo(models.pli, { foreignKey: 'pliId'});
    AppearancePli.belongsTo(models.user, { foreignKey: 'userId'});
  };
  
  return AppearancePli;
}

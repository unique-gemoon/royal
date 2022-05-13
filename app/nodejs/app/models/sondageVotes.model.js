export default function sondageVotes(sequelize, Sequelize) {
  const SondageVotes = sequelize.define("sondageVotes", {
    sondageOptionId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'sondageOptions',
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

  SondageVotes.associate = function (models) {
    SondageVotes.belongsTo(models.sondageOptions, { foreignKey: "sondageOptionId" });
    SondageVotes.belongsTo(models.user, { foreignKey: "userId" });
  };
  
  return SondageVotes;
}

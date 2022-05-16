export default function sondageNotVotes(sequelize, Sequelize) {
  const SondageNotVotes = sequelize.define("sondageNotVotes", {
    mediumId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'media',
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

  SondageNotVotes.associate = function (models) {
    SondageNotVotes.belongsTo(models.media, { foreignKey: "mediumId" });
    SondageNotVotes.belongsTo(models.user, { foreignKey: "userId" });
  };
  
  return SondageNotVotes;
}

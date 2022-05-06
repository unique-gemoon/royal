export default function sondageOptions(sequelize, Sequelize) {
  const SondageOptions = sequelize.define("sondageOptions", {
    name: {
      type: Sequelize.STRING,
      notEmpty: true,
    },

    mediumId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'media',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'cascade',
    },

  });

  SondageOptions.associate = function (models) {
    SondageOptions.belongsTo(models.media, { foreignKey: "mediumId" });

    SondageOptions.belongsToMany(models.user, { through: "sondageVotes" });
  };
  
  return SondageOptions;
}

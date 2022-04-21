export default function sondageOptions(sequelize, Sequelize) {
  const SondageOptions = sequelize.define("sondageOptions", {
    name: {
      type: Sequelize.STRING,
      notEmpty: true,
    },

    mediaId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'media',
        key: 'id',
      },
    },

  });

  SondageOptions.associate = function (models) {
    SondageOptions.belongsTo(models.media, { foreignKey: "mediaId" });

    SondageOptions.belongsToMany(models.user, { through: "sondageVotes" });
  };
  
  return SondageOptions;
}

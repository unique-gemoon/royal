export default function sondageOptionsModel(sequelize, Sequelize) {
  const SondageOptions = sequelize.define("sondageOptions", {
    option: {
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
  
  return SondageOptions;
}

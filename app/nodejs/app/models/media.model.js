export default function media(sequelize, Sequelize) {
  const Media = sequelize.define("media", {
    type: {
      type: Sequelize.STRING,
      notEmpty: true,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    originalname: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    path: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    isOuverture: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    pliId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'plis',
        key: 'id',
      },
    },

  });

  Media.associate = function(models) {
    Media.belongsTo(models.pli, { foreignKey: 'pliId'});

    Media.hasMany(models.sondageOptions, { foreignKey: 'mediaId' });
  };
  
  return Media;
}

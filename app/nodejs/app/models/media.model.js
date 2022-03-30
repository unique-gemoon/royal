export default function mediaModel(sequelize, Sequelize) {
  const Media = sequelize.define("media", {
    type: {
      type: Sequelize.STRING,
      notEmpty: true,
    },

    name: {
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
  
  return Media;
}
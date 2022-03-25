export default function pliModel(sequelize, Sequelize) {
  const Pli = sequelize.define("pli", {
    content: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    ouverture: {
      type: Sequelize.TEXT,
      allowNull: true,
    },

    duration: {
      type: Sequelize.TIME,
      allowNull: true,
    },

    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },

  });
  
  return Pli;
}

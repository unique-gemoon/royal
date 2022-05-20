export default function thread(sequelize, Sequelize) {
  const Thread = sequelize.define("thread", {
    
  });

  Thread.associate = function (models) {
    Thread.hasMany(models.threadUsers);
    Thread.hasMany(models.message);
  };

  return Thread;
}

export default function appearancePliModel(sequelize, Sequelize) {
  const AppearancePli = sequelize.define("appearancePli", {
    duration: {
      type: Sequelize.TIME,
      notEmpty: true,
    },
  });
  
  return AppearancePli;
}

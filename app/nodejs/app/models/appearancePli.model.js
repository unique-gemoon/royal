export default function appearancePli(sequelize, Sequelize) {
  const AppearancePli = sequelize.define("appearancePli", {
    duration: {
      type: Sequelize.TIME,
      notEmpty: true,
    },
  });
  
  return AppearancePli;
}

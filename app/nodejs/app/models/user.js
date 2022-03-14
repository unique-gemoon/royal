const bcrypt = require('bcryptjs');

module.exports = function (sequelize, Sequelize) {
  const User = sequelize.define("user", {
      
    username: {
      type: Sequelize.STRING,
      notEmpty: true,
      unique: {
        args: true,
        msg: "Nom d'utilisateur déjà utilisé!"
      } 
    },

    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
      notEmpty: true,
      unique: {
        args: true,
        msg: 'Adresse e-mail déjà utilisée!'
      } 
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    last_login: {
      type: Sequelize.DATE,
    },

    enabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  // Creating a custom method for our User model. This will check if an unhashed
  // password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook('beforeCreate', (user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return User;
};

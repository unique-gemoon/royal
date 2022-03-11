const bcrypt = require('bcrypt-nodejs');

module.exports = function (sequelize, Sequelize) {
  const User = sequelize.define("user", {
      
    firstname: {
      type: Sequelize.STRING,
      notEmpty: true,
    },

    lastname: {
      type: Sequelize.STRING,
      notEmpty: true,
    },

    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
      notEmpty: true,
      unique: {
        args: true,
        msg: 'Email address already in use!'
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
      defaultValue: false,
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

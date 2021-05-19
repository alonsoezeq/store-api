const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 2 // 0 == admin, 1 == vendedor, 2 == cliente. ToDo: Cruzar con tabla de rol.
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, bcrypt.genSaltSync()));
      }
    },
    scoring: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    registration: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    disabled: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    }
  });

  return user;
}
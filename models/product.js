const picture = require('./picture');

module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define('product', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    article: {
      type: Sequelize.STRING,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    color: {
      type: Sequelize.STRING,
      allowNull: false
    },
    size: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    category: {
      type: Sequelize.STRING
    }
  });

  product.hasMany(sequelize.models.picture, {
    foreignKey: 'productId'
  });

  return product;
}
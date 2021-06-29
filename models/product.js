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
      allowNull: false,
      validate: {
        min: 0
      }
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    category: {
      type: Sequelize.STRING
    }
  });

  product.belongsToMany(sequelize.models.picture, { 
    through: 'product_picture'
  });

  sequelize.models.picture.belongsToMany(product, {
    through: 'product_picture'
  });

  return product;
}
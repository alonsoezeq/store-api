module.exports = (sequelize, Sequelize) => {
  const cartItem = sequelize.define('cartitem', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: sequelize.models.user,
        key: 'id'
      }
    },
    productId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: sequelize.models.product,
        key: 'id'
      }
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    }
  });

  cartItem.belongsTo(sequelize.models.user, {
    foreignKey: 'userId'
  });

  sequelize.models.user.hasMany(cartItem, {
    foreignKey: 'userId'
  });

  cartItem.belongsTo(sequelize.models.product, {
    foreignKey: 'productId'
  });
  
  sequelize.models.product.hasMany(cartItem, {
    foreignKey: 'productId'
  });

  return cartItem;
}
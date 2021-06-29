module.exports = (sequelize, Sequelize) => {
  const transactionItem = sequelize.define('transactionitem', {
    transactionId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: sequelize.models.transaction,
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
    },
    unitPrice: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    discount: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    charges: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    notes: {
      type: Sequelize.STRING
    }
  });

  transactionItem.belongsTo(sequelize.models.product, {
    foreignKey: 'productId'
  });
  
  sequelize.models.product.hasMany(transactionItem, {
    foreignKey: 'productId'
  });

  return transactionItem;
}
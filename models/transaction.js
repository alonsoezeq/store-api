vamodule.exports = (sequelize, Sequelize) => {
  const transaction = sequelize.define('transaction', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: sequelize.models.user,
        key: 'id'
      }
    },
    paymentStatus: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    shippingStatus: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    totalPrice: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    shippingPrice: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    charges: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    province: {
      type: Sequelize.STRING,
      allowNull: false
    },
    discounts: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    incidents: {
      type: Sequelize.STRING
    },
    notes: {
      type: Sequelize.STRING
    }
  });

  transaction.belongsTo(sequelize.models.user, {
    foreignKey: 'userId'
  });

  sequelize.models.user.hasMany(transaction, {
    foreignKey: 'userId'
  });

  transaction.hasMany(sequelize.models.transactionitem, {
    foreignKey: 'transactionId'
  });

  sequelize.models.transactionitem.belongsTo(transaction, {
    foreignKey: 'transactionId'
  });
  
  return transaction;
}
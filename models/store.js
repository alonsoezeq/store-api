
module.exports = (sequelize, Sequelize) => {
  const store = sequelize.define('store', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  store.belongsToMany(sequelize.models.picture, { 
    through: 'store_picture'
  });

  sequelize.models.picture.belongsToMany(store, {
    through: 'store_picture'
  });

  return store;
}
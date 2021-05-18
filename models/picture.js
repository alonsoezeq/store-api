module.exports = (sequelize, Sequelize) => {
  const picture = sequelize.define('picture', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    picture: {
      type: Sequelize.BLOB,
      allowNull: false,
      get() {
        return this.getDataValue('picture').toString('utf8');
      }
    }
  });

  return picture;
}
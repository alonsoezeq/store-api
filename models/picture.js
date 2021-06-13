module.exports = (sequelize, Sequelize) => {
  const picture = sequelize.define('picture', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    picture: {
      type: Sequelize.BLOB,
      allowNull: false,
      get() {
        return this.getDataValue('picture').toString('utf-8');
      }
    }
  });

  return picture;
}
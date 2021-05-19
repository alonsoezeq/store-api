const imageType = require('image-type');

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
        // si se postea viene en base64, si se lee viene en formato buffer.
        // De esta manera se manejan los dos tipos. Feo. Mejorar.
        let picture = this.getDataValue('picture').toString('utf-8');
        let imgType = imageType(new Buffer.from(picture, 'base64'));
        return 'data:' + imgType.mime + ';base64, ' + picture;
      }
    }
  });

  return picture;
}
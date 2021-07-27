const { Sequelize } = require('sequelize');
const config = require('../config/config');
const sequelize = new Sequelize(config.connectionUri, {
  logging: false
});

// Test connection
try {
  // await sequelize.authenticate();
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.picture = require('./picture')(sequelize, Sequelize);
db.product = require('./product')(sequelize, Sequelize);
db.store = require('./store')(sequelize, Sequelize);
db.user = require('./user')(sequelize, Sequelize);
db.cartitem = require('./cartitem')(sequelize, Sequelize);
db.transactionitem = require('./transactionitem')(sequelize, Sequelize);
db.transaction = require('./transaction')(sequelize, Sequelize);


sequelize.sync({
  // force: true // This creates the table, dropping it first if it already existed.
})
.then(seq => {
  // Populate initial objects
  seq.models.user.bulkCreate([
    {
      username: "admin",
      fullname: "Store Administrator",
      email: "administrator@store.com",
      role: "admin",
      password: "admin",
      address: "Mitre 1400",
      province: "Buenos Aires"
    },
    {
      username: "seller",
      fullname: "Store Seller",
      email: "seller@store.com",
      role: "seller",
      password: "seller",
      address: "Av. Santa Fe 1700",
      province: "Capital Federal"
    },
    {
      username: "buyer",
      fullname: "Store Buyer",
      email: "buyer@store.com",
      role: "buyer",
      password: "buyer",
      address: "Avenida Belgrano 2320",
      province: "Buenos Aires"
    }
  ]);
});
console.log("All models were synchronized successfully.");

module.exports = db;
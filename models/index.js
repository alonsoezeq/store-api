const { Sequelize } = require('sequelize');
const config = require('../config/config');
const sequelize = new Sequelize(config.connectionUri, {
  logging: true
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
db.user = require('./user')(sequelize, Sequelize);

sequelize.sync({ force: true });
console.log("All models were synchronized successfully.");

module.exports = db;
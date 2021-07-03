"use strict";

const express = require('express');
const router = express.Router();
const { Sequelize, sequelize, transaction, transactionitem } = require('../models');
const auth = require('../middleware/auth');

// Get all sales
router.get('/', auth(['admin', 'seller']), (req, res, next) => {
  transaction.findAll({
    include: {
      model: transactionitem
    }
  })
  .then(data => res.json(data))
  .catch(err => res.status(500).send({
    message: err.message || 'Some error occurred while reading cart item'
  }));
});

module.exports = router;
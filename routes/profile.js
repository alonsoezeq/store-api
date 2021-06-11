"use strict";

const express = require('express');
const router = express.Router();
const config = require('../config/config');
const { Sequelize, sequelize, user } = require('../models');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// Get authenticated user
router.get('/', (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const payload = jwt.verify(token, config.jwtSecret);

  user.findByPk(parseInt(payload.id))
    .then(data => data ? res.json(data) : res.status(404).send())
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while reading user'
    }));
});

module.exports = router;
"use strict";

const express = require('express');
const router = express.Router();
const config = require('../config/config');
const { Sequelize, sequelize, user } = require('../models');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Get authenticated user
router.get('/', auth(), (req, res, next) => {
  user.findByPk(parseInt(req.jwtPayload.id))
    .then(data => data ? res.json(data) : res.status(404).send({
      message: 'User not found'
    }))
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while reading user'
    }));
});

module.exports = router;
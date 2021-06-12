"use strict";

const express = require('express');
const router = express.Router();
const config = require('../config/config');
const { Sequelize, sequelize, user } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Authenticate user
router.post('/', function(req, res, next) {
  user.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(data => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
        const payload = {
          id: data.id,
          username: data.username,
          role: data.role
        };

        const token = jwt.sign(payload, config.jwtSecret, {
          expiresIn: config.jwtExpires
        });

        res.send({token});
      } else {
        res.status(401).send({
          message: 'Unauthorized'
        });
      }
  })
  .catch(err => res.status(500).send({
    message: err.message || 'Some error occurred while authenticating'
  }));
});

module.exports = router;
"use strict";

const express = require('express');
const router = express.Router();
const { Sequelize, sequelize, user } = require('../models');
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


// Update product attributes by id
router.patch('/:id', auth(), (req, res, next) => {
  user.update(req.body, {
      where: {
        id: parseInt(req.params.id)
      }
    })
    .then(() => res.status(204).send())
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while updating product'
    }));
});

module.exports = router;
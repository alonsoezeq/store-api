"use strict";

const express = require('express');
const router = express.Router();
const config = require('../config/config');
const { Sequelize, sequelize, cartitem, order, user, product } = require('../models');
const auth = require('../middleware/auth');

const properties = {
  include: {
    model: product
  }
};

// Get user's cart items
router.get('/', auth('buyer'), (req, res, next) => {
  cartitem.findAll({
      ...properties,
      where: {
        userId: req.jwtPayload.id
      }
    })
    .then(data => res.json(data))
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while reading user'
    }));
});

// Add/Modify item to/in user's cart
router.post('/', auth('buyer'), (req, res, next) => {
  let body = req.body;
  body.userId = req.jwtPayload.id;

  cartitem.upsert(body)
    .then(data => res.status(200).send())
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while creating object.'
    }));
});

// Remove item from user's cart
router.delete('/:id', auth('buyer'), (req, res, next) => {
  cartitem.destroy({
      where: {
        userId: req.jwtPayload.id,
        productId: req.params.id,
      }
    })
    .then(data => res.status(200).send())
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while creating object.'
    }));
});

module.exports = router;
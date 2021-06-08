"use strict";

const express = require('express');
const router = express.Router();
const config = require('../config/config');
const { Sequelize, sequelize, picture, product } = require('../models');

// Get all products
router.get('/', (req, res, next) => {
  product.findAll({
      offset: req.query.page ? req.query.page * config.defaultPageItems : 0,
      limit: config.defaultPageItems,
      include: [picture]
    })
    .then(data => res.json(data))
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while reading products'
    }));
});

// Get product by id
router.get('/:id', (req, res, next) => {
  product.findByPk(parseInt(req.params.id), {
      include: [picture]
    })
    .then(data => data ? res.json(data) : res.status(404).send())
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while reading product'
    }));
});

// Create product
router.post('/', (req, res, next) => {
  let creator = Array.isArray(req.body) ? (
      product.bulkCreate(req.body, {include: [picture]})
    ) : (
      product.create(req.body, {include: [picture]})
    );

  creator.then(data => res.status(201).json(data))
    .catch(err => {console.log(err); res.status(500).send({
      message: err.message || 'Some error occurred while creating product'
    })});
});

// Update full product by id
router.put('/:id', (req, res, next) => {
  let p = product.build(req.body);
  p.id = parseInt(req.params.id);

  product.update(p.toJSON(), {
      where: {
        id: parseInt(req.params.id)
      }
    })
    .then(() => res.status(204).send())
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while updating product'
    }));
});

// Update product attributes by id
router.patch('/:id', (req, res, next) => {
  product.update(req.body, {
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

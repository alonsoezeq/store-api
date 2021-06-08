"use strict";

const express = require('express');
const router = express.Router();
const config = require('../config/config');
const { Sequelize, sequelize, store } = require('../models');

// Get all stores
router.get('/', (req, res, next) => {
  store.findAll({
      offset: req.query.page ? req.query.page * config.defaultPageItems : 0,
      limit: config.defaultPageItems
    })
    .then(data => res.json(data))
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while reading stores'
    }));
});

// Get store by id
router.get('/:id', (req, res, next) => {
  store.findByPk(parseInt(req.params.id))
    .then(data => data ? res.json(data) : res.status(404).send())
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while reading store'
    }));
});

// Create store
router.post('/', (req, res, next) => {
  let creator = Array.isArray(req.body) ? store.bulkCreate(req.body) : store.create(req.body);

  creator.then(data => res.status(201).json(data))
    .catch(err => {console.log(err); res.status(500).send({
      message: err.message || 'Some error occurred while creating object.'
    })});
});

// Update full store by id
router.put('/:id', (req, res, next) => {
  let s = store.build(req.body);
  s.id = parseInt(req.params.id);

  store.update(s.toJSON(), {
      where: {
        id: parseInt(req.params.id)
      }
    })
    .then(() => res.status(204).send())
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while updating store'
    }));
});

// Update store attributes by id
router.patch('/:id', (req, res, next) => {
  store.update(req.body, {
      where: {
        id: parseInt(req.params.id)
      }
    })
    .then(() => res.status(204).send())
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while updating store'
    }));
});

module.exports = router;
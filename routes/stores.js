"use strict";

const express = require('express');
const router = express.Router();
const config = require('../config/config');
const { Sequelize, sequelize, picture, store } = require('../models');
const auth = require('../middleware/auth');

const properties = {
  include: {
    model: picture,
    through: {
      attributes: []
    }
  }
};

// Get all stores
router.get('/', (req, res, next) => {
  store.findAll({
      offset: req.query.page ? req.query.page * config.defaultPageItems : 0,
      limit: config.defaultPageItems,
      where: {
        // Filter by attributes which exists in object model
        ...Object.keys(req.query)
          .filter((key) => Object.keys(store.rawAttributes).includes(key))
          .reduce((obj, key) => ({...obj, [key]: req.query[key]}), {})
      },
      order: [
        ['name', 'ASC']
      ],
      ...properties
    })
    .then(data => res.json(data))
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while reading stores'
    }));
});

// Get store by id
router.get('/:id', (req, res, next) => {
  store.findByPk(parseInt(req.params.id), properties)
    .then(data => data ? res.json(data) : res.status(404).send({
      message: 'Store not found'
    }))
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while reading store'
    }));
});

// Create store
router.post('/', auth(['admin', 'seller']), (req, res, next) => {
  let creator = Array.isArray(req.body) ? (
    store.bulkCreate(req.body, properties)
  ) : (
    store.create(req.body, properties)
  )

  creator.then(data => res.status(201).json(data))
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while creating object.'
    }));
});

// Update full store by id
router.put('/:id', auth(['admin', 'seller']), (req, res, next) => {
  store.findByPk(parseInt(req.params.id), properties)
  .then(data => {
    if (data) {
      data.update(req.body)
      .then(() => {
        if (req.body.pictures?.length > 0) {
          picture.bulkCreate(req.body.pictures, { updateOnDuplicate: ['id'] })
          .then((pictures) => {
            data.setPictures(pictures)
            .then((store) => res.json(data))
            .catch((err) => res.status(500).send({
              message: 'Cant update store pictures'
            }));
          })
          .catch((err) => res.status(500).send({
            message: 'Cant create store pictures'
          }));
        } else {
          res.json(data);
        }
      })
      .catch((err) => res.status(500).send({
        message: 'Cant update store'
      }));
    } else {
      res.status(404).send({
        message: 'Store not found'
      });
    }
  })
  .catch(err => res.status(500).send({
    message: err.message || 'Some error occurred while reading product'
  }));
});

// Update store attributes by id
router.patch('/:id', auth(['admin', 'seller']), (req, res, next) => {
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
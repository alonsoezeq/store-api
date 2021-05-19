"use strict";

const express = require('express');
const router = express.Router();
const config = require('../config/config');
const { Sequelize, sequelize, user } = require('../models');

// Get all users
router.get('/', (req, res, next) => {
  user.findAll({
      offset: req.query.page ? req.query.page * config.defaultPageItems : 0,
      limit: config.defaultPageItems
    })
    .then(data => res.json(data))
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while reading users'
    }));
});

// Get user by id
router.get('/:id', (req, res, next) => {
  user.findByPk(parseInt(req.params.id))
    .then(data => data ? res.json(data) : res.status(404).send())
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while reading user'
    }));
});

// Create user
router.post('/', (req, res, next) => {
  let creator = Array.isArray(req.body) ? user.bulkCreate(req.body) : user.create(req.body);

  creator.then(data => res.status(201).json(data))
    .catch(err => {console.log(err); res.status(500).send({
      message: err.message || 'Some error occurred while creating object.'
    })});
});

module.exports = router;

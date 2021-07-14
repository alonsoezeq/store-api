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

// Update profile by id
router.put('/:id', auth(), (req, res, next) => {
  let s = user.build(req.body);
  //s.id = parseInt(req.params.id);

  user.update({
  	username: req.body.username,
  	fullname: req.body.fullname,
  	email: req.body.email,
  	adress: req.body.adress,
  	province: req.body.province

  }, {
      where: {
        id: parseInt(req.jwtPayload.id)
      }
    })
    .then(() => res.status(204).send())
    .catch(err =>  res.status(500).send({
      message: err.message || 'Some error occurred while updating store'
    }));
});


module.exports = router;
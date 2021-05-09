"use strict";

var express = require('express');
const { Sequelize } = require('../models');
var router = express.Router();

const db = require("../models");
const product = db.product;
const Op = db.Sequelize.Op;

// Get all products
router.get('/', (req, res, next) => {
  product.findAll()
         .then(data => res.json(data))
         .catch(err => res.status(500).send({
           message: err.message || 'Some error occurred while reading object.'
         }));
});

// Get product by id
router.get('/:id', (req, res, next) => {
  product.findByPk(parseInt(req.params.id))
         .then(data => data ? res.json(data) : res.status(404).send())
         .catch(err => res.status(500).send({
          message: err.message || 'Some error occurred while reading object.'
         }));
});

// Create product
router.post('/', (req, res, next) => {
  product.create(req.body)
         .then(data => res.status(201).json(data))
         .catch(err => res.status(500).send({
           message: err.message || 'Some error occurred while creating object.'
         }));
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
         .then(data => res.status(204).send())
         .catch(err => res.status(500).send({
           message: err.message || 'Some error occurred while creating object.'
         }));
})

// Update product attributes by id
router.patch('/:id', (req, res, next) => {
  product.update(req.body, {
           where: {
             id: parseInt(req.params.id)
           }
         })
         .then(data => res.status(204).send())
         .catch(err => res.status(500).send({
           message: err.message || 'Some error occurred while creating object.'
         }));
});



module.exports = router;

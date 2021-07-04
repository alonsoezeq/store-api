"use strict";

const express = require('express');
const router = express.Router();
const { Sequelize, sequelize, cartitem, product, transaction, transactionitem } = require('../models');
const auth = require('../middleware/auth');

// Get user's cart items
router.get('/', auth('buyer'), (req, res, next) => {
  cartitem.findAll({
      include: {
        model: product
      },
      where: {
        userId: req.jwtPayload.id
      }
    })
    .then(data => res.json(data))
    .catch(err => res.status(500).send({
      message: err.message || 'Some error occurred while reading cart item'
    }));
});

// Add/Modify item to/in user's cart
router.post('/', auth('buyer'), (req, res, next) => {
  let body = req.body;
  body.userId = req.jwtPayload.id;

  product.findOne({
    where: {
      id: body.productId
    }
  })
  .then(data => {
    if (!data) {
      res.status(404).send({message: 'Product not found'})
    } else if (data.quantity >= body.quantity) {
      cartitem.upsert(body)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(500).send({
        message: err.message || 'Some error occurred while creating object.'
      }));
    } else {
      res.status(409).send({message: `${data.quantity} products available`});
    }
  })
  .catch(err => res.status(500).send({
    message: err.message || 'Some error occurred while reading cart item'
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


// Buy cart
router.post('/checkout', auth('buyer'), (req, res, next) => {
  sequelize.transaction(t => {
    return cartitem.findAll({
      include: {
        model: product
      },
      where: {
        userId: req.jwtPayload.id
      },
      transaction: t
    })
    .then(items => {
      if (items.length === 0) {
        return Promise.reject({
          message: 'No products to checkout.'
        })
      }

      if (items.find((item) => item.quantity > item.product.quantity)) {
        return Promise.reject({
          message: 'Some products are not available.'
        });
      }

      return transaction.create({
        userId: req.jwtPayload.id,
        totalPrice: items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
        address: 'TEST',
        transactionitems: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.product.price
        }))
      }, {
        include: {
          model: transactionitem
        },
        transaction: t
      })
      .then((data) => {
        let promises = [];
        data.transactionitems.forEach(({productId, quantity}) => {
          promises.push(product.decrement({
            quantity: quantity
          }, {
            where: {
              id: parseInt(productId)
            },
            transaction: t
          }));
        });
        return Promise.resolve(data);
      })
      .then(data => {
        cartitem.destroy({
          where: {
            userId: req.jwtPayload.id
          }
        });
        return Promise.resolve(data);
      });
    });
  })
  .then(data => res.status(200).send(data))
  .catch(err => res.status(500).send({
    message: err.message || 'Some error occurred while creating transaction.'
  }));
});

module.exports = router;
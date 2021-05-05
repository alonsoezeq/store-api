"use strict";

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send([
    {
      'id': 1
    }, {
      'id': 2
    }, {
      'id': 3
    }
  ]);
});

router.get('/:id', function(req, res, next) {
  res.send({
    'id': req.params.id
  });
});

module.exports = router;

const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (roles = []) => {

  if (typeof roles === 'string') {
    roles = [roles];
  }  

  return (req, res, next) => {

    try {
      const token = req.headers.authorization?.split(' ')[1];
      req.jwtPayload = jwt.verify(token, config.jwtSecret);
    } catch (error) {
      res.status(401).send({ message: error.message });
      return;
    }

    const authorized = (roles.length === 0 || roles.includes(req.jwtPayload.role));

    return authorized ? next() : res.status(401).send({
      message: 'Unauthorized'
    });
  }
}
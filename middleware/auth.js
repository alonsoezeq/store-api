const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (roles = []) => {

  if (typeof roles === 'string') {
    roles = [roles];
  }  

  return (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, config.jwtSecret);
    const authorized = (roles.length === 0 || roles.includes(payload.role));

    return authorized ? next() : res.status(401).send();
  }
}
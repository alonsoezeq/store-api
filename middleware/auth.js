const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (roles = []) => {

  if (typeof roles === 'string') {
    roles = [roles];
  }  

  return (req, res, next) => {
   
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const payload = jwt.verify(token, config.jwtSecret);
      req.jwtPayload = payload;
    } catch (error) {
      res.status(401).send({ message: error.message });
      return;
    }
    
    const authorized = (roles.length === 0 || roles.includes(payload.role));

    return authorized ? next() : res.status(401).send({
      message: 'Unauthorized'
    });
  }
}
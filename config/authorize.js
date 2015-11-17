'use strict';

var User = require('../models/user');

module.exports = function(req, res, next){
  var userId = req.cookies.userId;
  User.findById(userId, function(err, user){
    if (err || !user) return res.status(401).send(err || 'Access denied. Authentication required.');
    next();
  });
}

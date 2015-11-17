'use strict';

var express = require('express');
var router = express.Router();

var authorize = require('../config/authorize');

var User = require('../models/user')

router.get('/:userId', authorize, function(req, res){
  User.findById(req.params.userId, function(err, user){
    if (err) return res.status(400).send(err);
    res.render('cell', {user: user});
  });
});


module.exports = router;

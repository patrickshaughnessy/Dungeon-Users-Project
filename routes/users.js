'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/check/:username', function(req, res){
  var newUsername = req.params.username;
  console.log(newUsername);
  User.findOne({ username: newUsername}, function(err, user){
    console.log(err, user);
    if (err || user) return res.send(err || 'Sorry, that username is taken.');
    return res.send('ok');
  });
});

router.post('/register', function(req, res){
  User.register(req.body, function(err, savedUser){
    if (err) return res.status(400).send(err);
    console.log(savedUser);
    res.send(savedUser);
  })
})



module.exports = router;
